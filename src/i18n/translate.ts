export type TranslateVariables = Record<string, string | number>;

export type Translator = (key: string, variables?: TranslateVariables) => string;

/**
 * Dictionary lookup keyed by the English source copy (or a dotted key for
 * interpolated templates). Missing entries fall back to the English key so the
 * site degrades gracefully while translations are filled in.
 */
export function makeTranslator(messages: Record<string, string>): Translator {
  return (key, variables) => {
    const template = messages[key] ?? key;
    if (!variables) return template;
    return template.replace(/\{(\w+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : match,
    );
  };
}
