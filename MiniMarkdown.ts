export class MiniMarkdown {
    makeHtml(markdown: string): string {
        let result = markdown;
        result = this.htmlItalics(result);
        result = this.htmlParticularOriginalLanguage(result);
        result = this.htmlOriginalLanguage(result);
        return result;
    }

    private htmlItalics(markdown: string): string {
        // Regular expression to match text between asterisks
        const regex = /\*(.*?)\*/g;
        // Replace matched text with <i> tags
        return markdown.replace(regex, '<i>$1</i>');
    }

    private htmlParticularOriginalLanguage(markdown: string): string {
        // Regular expression to match text between double square brackets with a pipe separator
        const regex = /\[\[(.*?)\|(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '<span class="$1">$2</span>');
    }

    private htmlOriginalLanguage(markdown: string): string {
        // Regular expression to match text between double square brackets
        const regex = /\[\[(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '<span class="original-language">$1</span>');
    }

    makeTex(markdown: string): string {
        let result = markdown;
        result = this.texItalics(result);
        result = this.texParticularOriginalLanguage(result);
        result = this.texOriginalLanguage(result);
        return result;
    }

    private texItalics(markdown: string): string {
        // Regular expression to match text between asterisks
        const regex = /\*(.*?)\*/g;
        // Replace matched text with <i> tags
        return markdown.replace(regex, '\\emph{$1}');
    }

    private texParticularOriginalLanguage(markdown: string): string {
        // Regular expression to match text between double square brackets with a pipe separator
        const regex = /\[\[(.*?)\|(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '\\text$1{$2}');
    }

    private texOriginalLanguage(markdown: string): string {
        // Regular expression to match text between double square brackets
        const regex = /\[\[(.*?)\]\]/g;
        // Replace matched text with <span> tags
        return markdown.replace(regex, '\\textmainlanguage{$1}');
    }

}