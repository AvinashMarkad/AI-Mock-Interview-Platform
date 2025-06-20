import Agent from "@/components/Agent";

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Interview Genration</h1>
      <Agent userName="You" userId="user1" type="genrate" />
    </div>
  );
}
