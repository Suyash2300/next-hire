export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} NextHire. All rights reserved.
      </div>
    </footer>
  );
}
