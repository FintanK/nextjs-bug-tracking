import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/bugs/new'>
        <Button>
          <IoIosAdd /> New Bug
        </Button>
      </Link>
    </div>
  );
}
