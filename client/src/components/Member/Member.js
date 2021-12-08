import "./Member.scss";

export default function Member({ member }) {
  return (
    <div className="member">
      <img
        src={
          member.picture
            ? member.picture
            : "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
        }
        alt=""
      />
      <div className="name">{member.name ? member.name : "A secret one"}</div>
    </div>
  );
}
