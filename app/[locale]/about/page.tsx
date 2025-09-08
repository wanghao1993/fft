"use client";
import { Advantages } from "@/components/about/advantages";
import { BrandStatement } from "@/components/about/brandStatement";
import { BusinessSections } from "@/components/about/bussinessSecion";
import { Mission } from "@/components/about/mission";
import { Vision } from "@/components/about/vision";
import "./style.css";

export default function AboutUs() {
  return (
    <main id="about">
      <BrandStatement />
      <Mission />
      <BusinessSections />
      <Advantages />
      <Vision />
    </main>
  );
}
