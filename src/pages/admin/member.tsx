import Container from "@/components/admin/container";
import ProkerCreate from "@/components/admin/proker/proker-create";
import { useState } from "react";
import MemberList from "@/components/admin/member/member-list";

export default function Member() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  return (
    <>
      <h1>Program Kerja</h1>
      <Container>
        <ProkerCreate
          setIsLoadingForm={setIsLoadingForm}
          isLoadingForm={isLoadingForm}
        />
      </Container>
      <Container>
        <MemberList isLoadingForm={isLoadingForm} />
      </Container>
    </>
  );
}
