import { useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { BLUR_COMMAND, COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';

interface FocusPluginProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export const FocusPlugin: React.FC<FocusPluginProps> = ({ onFocus, onBlur }) => {
  const [editor] = useLexicalComposerContext();
  const [hasFocus, setHasFocus] = useState<boolean | null>(null);
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setHasFocus(true);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setHasFocus(false);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);
  useEffect(() => {
    if (hasFocus && onFocus) {
      onFocus();
    }
    if (!hasFocus && hasFocus !== null && onBlur) {
      onBlur();
      setHasFocus(null);
    }
  }, [hasFocus, onFocus, onBlur]);
  return null;
};
