import Image from "next/image";
import logo from '../../public/logo.png';

export default function Logo() {
  return (
    <Image src={logo} alt="Logo" width={40} height={40}></Image>
  )
}
