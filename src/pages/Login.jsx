import { useLogin } from "../hooks/useLogin";



function login() {
  const { signUpWithGoogle } = useLogin();
  return (
    <div>
      <button
        onClick={signUpWithGoogle}
        className="btn btn-primary text-center items-center"
      >
        Sign up with Google
      </button>
    </div>
  );
}

export default login;

