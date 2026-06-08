export default function Footer() {
  return (
    <footer className="rounded-full mb-4 py-4 max-w-[1120px] w-full mx-auto shadow-sm backdrop-blur-md">
      <div className="mx-auto px-10">
        <div className="flex justify-between items-center">
          <div className="items-center gap-6">
            <p className="text-base font-medium text-black">Weave Studio.</p>
            <p className="text-sm text-black/70">Vancouver, BC</p>
          </div>
          <p className="text-center text-sm text-black/70">
            © 2025 Weave Studio. All rights reserved.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-6"
          aria-label="Footer"
        />
      </div>
    </footer>
  );
}
