import "./Member.scss";

export default function Member({ member, hideName, online }) {
  return (
    <div className={online ? "member online" : "member"}>
      <img src={member.picture ? member.picture : "/avatar.svg"} alt="" />
      {!hideName && (
        <div className="name">{member.name ? member.name : "A secret one"}</div>
      )}
    </div>
  );
}
