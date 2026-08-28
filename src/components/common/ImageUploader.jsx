import toast from "react-hot-toast";
const ImageUploader = ({ setImageLink, children }) => {
    async function handleFileChange(event) {
        const files = event.target.files;
        if (files && files.length === 1) {
            const formData = new FormData;
            formData.set('file', files[0]);
            const uploadPromise = new Promise(async (resolve, reject) => {
                await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    if (response.ok) {
                        response.json().then(link => { setImageLink(link), resolve(link); });
                    }
                    else {
                        reject();
                    }
                });
            });
            toast.promise(uploadPromise, {
                loading: "Uploading...",
                success: "Upload success",
                error: "Upload failed",
            });
        }
    }
    return (<label className="cursor-pointer">
      <input type="file" accept="image/*" onChange={handleFileChange} hidden/>
      {children && children}
    </label>);
};
export default ImageUploader;
