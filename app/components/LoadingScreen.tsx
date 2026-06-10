type LoadingScreenProps = {
  visible: boolean;
};

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#dff4f8] transition-opacity duration-1000 ease-in-out 
        ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <p className="font-display text-2xl font-medium tracking-wide text-black">
        Weave Studio.
      </p>
      <div className="mt-6 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-midnight animate-loading-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
