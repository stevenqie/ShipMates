import "./styles.css";

export default function ChatCard({ title, imageUrl }) {
  return (
    <div className="container noselect">
      <div className="canvas">
        {[...Array(25)].map((_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`} />
        ))}

        <div id="card" className="flex items-center space-x-4">
          <img
            src={imageUrl}
            alt="Avatar"
            className="w-16 h-16 rounded-full mr-16" // Circular image with margin-right
          />
          <div className="title">{title}</div>
        </div>
      </div>
    </div>
  );
}
