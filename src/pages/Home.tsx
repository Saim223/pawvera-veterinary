import { Hero } from "@/components/hero/Hero";
import { Stats } from "@/components/sections/Stats";
import { BentoImpact } from "@/components/sections/BentoImpact";
import { FindVeterinarian } from "@/components/sections/FindVeterinarian";
import { OnlineConsultation } from "@/components/sections/OnlineConsultation";
import { PetImageUpload } from "@/components/sections/PetImageUpload";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DoctorMessage } from "@/components/sections/DoctorMessage";
import { EmergencyCare } from "@/components/sections/EmergencyCare";
import { ProductPreviews } from "@/components/sections/ProductPreviews";
import { DoctorCTA } from "@/components/sections/DoctorCTA";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <BentoImpact />
      <FindVeterinarian />
      <OnlineConsultation />
      <PetImageUpload />
      <HowItWorks />
      <DoctorMessage />
      <EmergencyCare />
      <div id="doctor-dashboard">
        <ProductPreviews />
      </div>
      <DoctorCTA />
      <Testimonials />
    </>
  );
}
