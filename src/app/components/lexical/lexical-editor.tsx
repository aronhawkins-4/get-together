'use client';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { ToolbarPlugin } from './plugins/toolbar/ToolbarPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorTheme } from './theme';
import { EditorState, ParagraphNode, TextNode } from 'lexical';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import './styles.css';
import { FocusPlugin } from './plugins/focus/focusPlugin';
import { updateMealContent } from '@/app/functions/actions/meals/updateMealContent';
import { InitialStatePlugin } from './plugins/initial-state/initialStatePlugin';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

interface EditorProps {
  mealId: string | undefined | null;
  content: string | null | undefined;
}
export const Editor: React.FC<EditorProps> = ({ mealId, content }) => {
  const editorStateRef = useRef<EditorState | null>(null);
  const { toast } = useToast();

  function onError(error: unknown) {
    console.error(error);
  }
  const handleSave = async () => {
    if (editorStateRef.current) {
      if (mealId && editorStateRef.current) {
        const { data, error } = await updateMealContent(mealId, editorStateRef.current.toJSON());
        if (error) {
          console.log(error.message);
          toast({
            title: 'Error Saving Meal Content',
            description: error.message,
            variant: 'destructive',
          });
        }
        if (data) {
          toast({
            title: 'Meal Content Saved',
          });
        }
      }
    }
  };

  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    onError,
    nodes: [LinkNode, ParagraphNode, TextNode, ListNode, ListItemNode],
  };

  if (!mealId) return;
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <OnChangePlugin
        onChange={(editorState) => {
          editorStateRef.current = editorState;
        }}
      />
      <FocusPlugin onBlur={handleSave} />
      <InitialStatePlugin content={content} />
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' aria-placeholder={'Enter meal information'} placeholder={<div className='editor-placeholder'>Enter meal information</div>} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
