import Link from "next/link";
function NextLink({ path, className, style, children }) {
  return (
    <Link href={path} className={className} style={style}>
      {children}
    </Link>
  );
}

export default NextLink;
