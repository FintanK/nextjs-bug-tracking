import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/bugs/new'>
        <h1>Welcome.</h1>
        <p>Have an issue / bug in your project? Get started.</p>
        <Button>
          <IoIosAdd /> New Bug
        </Button>
      </Link>
    </div>
  );
}
