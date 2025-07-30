import logo from '../../assests/116920_clipboard_512x512.png';

export const Navbar = () => {
    return (
        <header className="flex items-center gap-2 p-1 border-b-4 border-gray-300">
            {/* Logo container */}
            <div className="w-12 h-12">
                <img className="w-full h-full object-contain" src={logo} alt="logo" />
            </div>

            {/* App title */}
            <h1 className="text-sky-900 font-bold text-4xl ">NoteIt</h1>
        </header>
    );
}
