export const stats = {
  totalCompanies: 24,
  totalOpportunities: 32,
  studentsPlaced: 58,
  totalEligible: 75,
  placementPercentage: 77.3,
  highestPackage: "18.5 LPA",
  averagePackage: "7.2 LPA",
  medianPackage: "6.5 LPA",
};

export const companyWise = [
  { company: "TCS", placed: 16, avgPackage: "7.0 LPA", role: "Digital & Ninja" },
  { company: "Infosys", placed: 14, avgPackage: "6.5 LPA", role: "Specialist Programmer" },
  { company: "Wipro", placed: 10, avgPackage: "6.0 LPA", role: "Project Engineer" },
  { company: "Cognizant", placed: 8, avgPackage: "6.8 LPA", role: "GenC Next" },
  { company: "Accenture", placed: 6, avgPackage: "8.5 LPA", role: "Advanced App Engineering" },
  { company: "Amazon", placed: 4, avgPackage: "18.5 LPA", role: "Software Dev Engineer" },
];

export const salaryDistribution = [
  { range: "3 - 5 LPA", count: 12, label: "Core/Mass", percentage: 21 },
  { range: "5 - 7 LPA", count: 22, label: "Standard IT", percentage: 38 },
  { range: "7 - 10 LPA", count: 14, label: "Differential", percentage: 24 },
  { range: "10 - 15 LPA", count: 6, label: "Dream Offers", percentage: 10 },
  { range: "15+ LPA", count: 4, label: "Super Dream", percentage: 7 },
];

export const branchWise = [
  { branch: "Computer Science (CSE)", total: 40, placed: 35, percentage: 87.5 },
  { branch: "Information Technology (IT)", total: 20, placed: 16, percentage: 80.0 },
  { branch: "Electronics & Comm (ECE)", total: 15, placed: 10, percentage: 66.7 },
  { branch: "Mechanical Eng (ME)", total: 10, placed: 5, percentage: 50.0 },
];

export const yearlyComparison = [
  { year: "2022-23", companies: 16, placed: 42, highest: "12.0 LPA", avg: "5.4 LPA", rate: 68 },
  { year: "2023-24", companies: 20, placed: 48, highest: "15.0 LPA", avg: "6.1 LPA", rate: 72 },
  { year: "2024-25", companies: 24, placed: 54, highest: "18.0 LPA", avg: "6.8 LPA", rate: 75 },
  { year: "2025-26", companies: 28, placed: 58, highest: "18.5 LPA", avg: "7.2 LPA", rate: 77.3 },
];
