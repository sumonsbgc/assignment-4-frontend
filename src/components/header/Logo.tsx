import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/images/logo-2.png";

const Brand = ({ href = "/" }: { href?: string }) => {
	return (
		<Link href={href} className="flex items-center gap-2">
			<Image
				src={logoImg.src}
				width={32}
				height={32}
				className="max-h-8 dark:invert"
				alt="Medi Shop"
			/>
			<span className="text-lg font-semibold tracking-tighter">Medi Shop</span>
		</Link>
	);
};

const Logo = ({ href = "/" }: { href?: string }) => {
	return (
		<Link href={href} className="flex items-center gap-2">
			<Image
				src={logoImg.src}
				width={32}
				height={32}
				className="max-h-8 dark:invert"
				alt="Medi Shop"
			/>
		</Link>
	);
};

export { Logo, Brand };
