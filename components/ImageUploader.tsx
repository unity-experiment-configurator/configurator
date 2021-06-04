import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/Firebase";
// import CodeBlock from "./CodeBlock";
import Loader from "./Loader";

function getThumbnailURL(imageURL: string) {
  const regex = /uploads%2F.*%2F/i;
  const uploadsPath = regex.exec(imageURL)[0];
  return imageURL.replace(uploadsPath, uploadsPath + "thumb_");
}

// Uploads images to Firebase Storage
export default function ImageUploader({onComplete}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const [thumbnailReady, setThumbnailReady] = useState(false);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0] as any;
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0) as any;
      setProgress(pct);
    });

    // Get imageURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((imageURL) => {
        const thumbnailURL = getThumbnailURL(imageURL);
        setImageURL(imageURL);
        setThumbnailURL(thumbnailURL);
        setUploading(false);
        onComplete({
          imageURL,
          thumbnailURL,
        });
      });
  };

  const thumbRef = useRef();

  useEffect(() => {
    // when the thumbnailURL is set, keep trying to load the image until it succeeds

    if (thumbRef.current) {
      const timestamp = Date.now();

      // @ts-ignore
      thumbRef.current.onerror = () => {
        if (Date.now() - timestamp < 10000) {
          setTimeout(() => {
            // @ts-ignore
            thumbRef.current.src = thumbnailURL;
          }, 1000);
        }
      };
      // @ts-ignore
      thumbRef.current.onload = () => {
        setThumbnailReady(true);
      }
      // @ts-ignore
      thumbRef.current.src = thumbnailURL;
    }
  }, [thumbnailURL]);

  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && !imageURL && (
        <>
          <label className="bg-gray-400 p-4 block cursor-pointer">
            📸 Upload Image
            <input
              type="file"
              onChange={uploadFile}
              className="hidden"
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {/* {downloadURL && <CodeBlock code={`![alt](${downloadURL})`}></CodeBlock>} */}

      {thumbnailURL && !thumbnailReady && <>loading...</>}

      {thumbnailURL && <img ref={thumbRef} className={classNames({
        "hidden": !thumbnailReady
      })} />}
    </div>
  );
}
