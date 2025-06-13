function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="container mx-auto mt-auto py-4 text-center text-gray-500 text-sm">
            <p>&copy; {currentYear} Productivity Hub. All rights reserved.</p>
        </footer>
    )
}

export default Footer;