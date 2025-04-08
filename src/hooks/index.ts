import toast from "react-hot-toast"

export const generatePDFBlob = (data: string) => {
  const blob = new Blob([data], { type: "application/pdf" })
  const blobUrl = URL.createObjectURL(blob)

  // 4. Proper window handling
  const newWindow = window.open()
  if (newWindow) {
    newWindow.document.write(`
        <iframe 
            src="${blobUrl}"
            width="100%" 
            height="100%" 
            style="border: none;"
            onload="URL.revokeObjectURL('${blobUrl}')"
        ></iframe>
    `)
  } else {
    toast.error("Allow pop-ups to view the report")
  }
}
