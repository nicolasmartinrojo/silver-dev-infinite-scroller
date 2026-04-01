import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

export default function HouseComponent(props: House) {
  return (
    <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
      <div>
        <img className="size-48 shadow-xl rounded-md" src={props.photoURL} />
      </div>
      <div className="flex items-center md:items-start">
        <span className="text-2xl font-medium">{props.address}</span>
        <span className="font-medium text-sky-500">{props.homeowner}</span>
        <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
          <span>{props.price}</span>
        </span>
      </div>
      <div className="flex min-h-svh items-center justify-center">
        <Button>Click me</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
    // <div className="rounded-sm ">
    //   Address: {props.address}
    //   <br />
    //   homeowner: {props.homeowner}
    //   <br />
    //   id: {props.id}
    //   <br />
    //   photo: {props.photoURL}
    //   <br />
    //   Price: {props.price}
    //   <br />
    // </div>
  );
}
