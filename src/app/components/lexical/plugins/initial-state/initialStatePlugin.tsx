import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

interface InitialStatePluginProps {
  content: string | undefined | null;
}

export const InitialStatePlugin: React.FC<InitialStatePluginProps> = ({ content }) => {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!content || !isFirstRender) return;

    setIsFirstRender(false);
    editor.update(() => {
      const editorState = editor.parseEditorState(content);
      editor.setEditorState(editorState);
    });
  }, [editor, content, isFirstRender]);

  useEffect(() => {
    setIsFirstRender(true);
  }, [content]);

  return null;
};
