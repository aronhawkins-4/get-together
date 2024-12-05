import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { ToolbarPlugin } from './plugins/toolbar/ToolbarPlugin';
import { EditorTheme } from './theme';
import { ParagraphNode, TextNode } from 'lexical';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import './styles.css';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export const Editor = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    onError,
    nodes: [LinkNode, ParagraphNode, TextNode, ListNode, ListItemNode],
  };

  const urlRegExp = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/);
  function validateUrl(url: string): boolean {
    return url === 'https://' || urlRegExp.test(url);
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* <HistoryPlugin />
      <ToolbarPlugin />
      <LinkPlugin validateUrl={validateUrl} />
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} /> */}
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
