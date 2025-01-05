export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-4 text-white ">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {year} Epicure. All rights reserved.</p>
      </div>
    </footer>
  );
}

