export function getPreviewImgURL(content: String){
    if (content.includes('<img')) {
        const start_html = content.search('<img')
        const end_html = content.substring(start_html, content.length).search('>')
        const previewImgHtml = content.substring(start_html, start_html + end_html + 1)
        const previewImgStart = previewImgHtml.search('src="')
        const previewImgEnd = previewImgHtml.substring(previewImgStart + 5).search('"')
        return previewImgHtml.substring(previewImgStart + 5 , previewImgStart + previewImgEnd + 5)
      }
    else return null
}