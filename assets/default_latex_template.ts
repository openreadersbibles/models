export const latexTemplate = "\\documentclass{openreader}\r\n\\title{__TITLE__}\r\n\\date{}\r\n\\setmainlanguage{__MAINLANGUAGE__}\r\n\\setmainfont{__MAINLANGUAGEFONT__}\r\n\\setotherlanguage{__BIBLICALLANGUAGE__}\r\n__NEWFONTFAMILYCOMMAND__\r\n\\FootnoteStyle{__FOOTNOTESTYLE__}\r\n\\begin{document}\r\n\\ORBselectlanguage{__BIBLICALLANGUAGE__}\r\n\\maketitle\r\n\\raggedbottom \r\n\\fontsize{16pt}{24pt}\\selectfont\r\n__CONTENT__\r\n\\end{document}";

