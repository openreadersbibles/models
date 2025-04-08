export class MiniMarkdown {
    makeHtml(markdown) {
        let result = markdown;
        result = this.htmlItalics(result);
        result = this.htmlParticularOriginalLanguage(result);
        result = this.htmlOriginalLanguage(result);
        return result;
    }
    htmlItalics(markdown) {
        // Regular expression to match text between asterisks
        const regex = /\*(.*?)\*/g;
        // Replace matched text with <i> tags
        return markdown.replace(regex, '<i>$1</i>');
    }
    htmlParticularOriginalLanguage(markdown) {
        // Regular expression to match text between double square brackets with a pipe separator
        const regex = /\[\[(.*?)\|(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '<span class="$1">$2</span>');
    }
    htmlOriginalLanguage(markdown) {
        // Regular expression to match text between double square brackets
        const regex = /\[\[(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '<span class="original-language">$1</span>');
    }
    makeTex(markdown) {
        let result = markdown;
        result = this.texItalics(result);
        result = this.texParticularOriginalLanguage(result);
        result = this.texOriginalLanguage(result);
        return result;
    }
    texItalics(markdown) {
        // Regular expression to match text between asterisks
        const regex = /\*(.*?)\*/g;
        // Replace matched text with <i> tags
        return markdown.replace(regex, '\\emph{$1}');
    }
    texParticularOriginalLanguage(markdown) {
        // Regular expression to match text between double square brackets with a pipe separator
        const regex = /\[\[(.*?)\|(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '\\text$1{$2}');
    }
    texOriginalLanguage(markdown) {
        // Regular expression to match text between double square brackets
        const regex = /\[\[(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '\\textmainlanguage{$1}');
    }
}
//# sourceMappingURL=MiniMarkdown.js.map