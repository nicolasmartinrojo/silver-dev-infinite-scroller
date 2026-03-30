export default function HouseComponent(props: House) {
  return (
    <>
      Address: {props.address}
      <br />
      homeowner: {props.homeowner}
      <br />
      id: {props.id}
      <br />
      photo: {props.photoURL}
      <br />
      Price: {props.price}
      <br />
    </>
  );
}
