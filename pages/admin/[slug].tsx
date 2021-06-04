import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/Firebase';
import Main from '../../components/Main';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug as any);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <Main>
      {post && (
        <>
          <section>
            <h1 className="py-4 text-2xl font-bold">{post.title}</h1>
            {/* <div>ID: {post.slug}</div> */}
            <PostForm postRef={postRef} defaultValues={post} />
          </section>
        </>
      )}
    </Main>
  );
}

function PostForm({ defaultValues, postRef }) {
  const { register, errors, handleSubmit, formState, reset, setValue } = useForm({ defaultValues, mode: 'onChange' });

  // const [preview, setPreview] = useState(false);
  const { isValid, isDirty } = formState;

  // const [objectURL, setObjectURL] = useState();
  // const [thumbnailURL, setThumbnailURL] = useState();

  const updatePost = async ({ description, published }) => {

    console.log("update post");

    await postRef.update({
      description,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ description, published });

    toast.success('Experiment updated');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <div>
        {/* {
          !defaultValues.thumbnailURL && (
            <ImageUploader onComplete={({ thumbnailURL }) => {
              setValue("thumbnailURL", thumbnailURL);
            }} />
          )
        }
        {
          defaultValues.thumbnailURL && (
            <img src={defaultValues.thumbnailURL} />
          )
        } */}

        {/* <div>
          <input className="hidden" id="thumbnailURL" name="thumbnailURL" type="text" ref={register} readOnly />
        </div> */}

        {/* <textarea
          name="description"
          className="w-full mt-4 h-32 border border-gray-500"
          ref={register({
            maxLength: { value: 20000, message: 'description is too long' },
            minLength: { value: 10, message: 'description is too short' },
            required: { value: true, message: 'description is required' },
          })}
        ></textarea> */}

        {/* {errors.description && <p className="text-danger">{errors.description.message}</p>} */}

        <div className="mt-2 mb-8">
          <input className="w-5 h-5 mr-2 align-middle" id="published" name="published" type="checkbox" ref={register} />
          <label htmlFor="published">Published</label>
        </div>

        <button type="submit" className="inline-block mr-2 bg-blue-500 text-white p-4" disabled={!isDirty || !isValid}>
          Save Changes
        </button>

        {/* <button className="inline-block mr-2 bg-blue-500 p-4 text-white" onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button> */}
        
        <Link href={`/${defaultValues.username}/${defaultValues.slug}`}>
          <button className="inline-block mr-2 bg-blue-500 p-4 text-white">View</button>
        </Link>

        <DeletePostButton postRef={postRef} />
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure?');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('object deleted ', { icon: '🗑️' });
    }
  };

  return (
    <button className="inline-block mr-2 border border-black p-4 text-red-500" onClick={deletePost}>
      Delete
    </button>
  );
}