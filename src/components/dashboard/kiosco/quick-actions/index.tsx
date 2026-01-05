// Next
import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./styles.module.scss";

// Types
interface QuickActionProps {
  label: string;
  icon: string;
  href: string;
}

export default function QuickAction({ ...props }: QuickActionProps) {
  const { label, icon, href } = props;

  return (
    <Link key={label} href={href} className={styles.card}>
      <div className={styles.icon_container}>
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className={styles.icon}
        />
      </div>

      <p className={styles.label}>{label}</p>
    </Link>
  );
}
