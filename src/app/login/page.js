import './style.css';

<script src="https://apis.google.com/js/platform.js" async defer></script>

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LoginForm({ className }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={cn("flex flex-col gap-6", className)}>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-md shadow-md">
          <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="w-5 h-5" />
          Login with Google
        </button>
        <div className="light-button">
        <button className="bt">
          <div className="light-holder">
            <div className="dot" />
            <div className="light" />
          </div>
          <div className="button-holder">
            <p>LeBron James</p>
          </div>
        </button>
      </div>
      </div>
    </div>
  );
}
