import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Globe, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Calendar,
  MoreVertical,
  ArrowUpRight,
  User,
  Gavel,
  ShoppingBag,
  Package,
  Box,
  PieChart,
  IndianRupee,
  FileText,
  ClipboardList,
  Building2,
  Users,
  AlertCircle,
  Info,
  ChevronDown,
  Maximize2,
  Minimize2,
  Bell,
  Clock
} from 'lucide-react';

enum Tab {
  INTERNATIONAL = 'INTERNATIONAL',
  DOMESTIC = 'DOMESTIC',
  LEGAL = 'LEGAL',
  PROCUREMENT_KITS = 'PROCUREMENT_KITS',
  PROCUREMENT_CONSUMABLES = 'PROCUREMENT_CONSUMABLES',
  PROCUREMENT_NON_CONSUMABLES = 'PROCUREMENT_NON_CONSUMABLES',
  FUND_UTILISATION = 'FUND_UTILISATION',
  FINANCE = 'FINANCE',
  AUDIT_REPORTS = 'AUDIT_REPORTS',
  INFRA_TENDERS = 'INFRA_TENDERS',
  INFRA_PROJECTS = 'INFRA_PROJECTS',
  VIP_GRIEVANCE = 'VIP_GRIEVANCE',
  PENDING_ISSUES = 'PENDING_ISSUES'
}

interface AchievementSummary {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  changes: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

interface RegionalData {
  id: string;
  name: string;
  stc: string;
  discipline: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
  participation: number;
}

interface AthleteData {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  state: string;
  discipline: string;
  ageGroup: string;
  competition: string;
  medal: 'Gold' | 'Silver' | 'Bronze' | 'None';
  participation: boolean;
}

interface MedalRecord {
  id: string;
  rcName: string;
  discipline: string;
  event: string;
  medal: 'Gold' | 'Silver' | 'Bronze';
  month: string;
  athletes: AthleteData[];
}

const MOCK_SUMMARY: Record<Tab, AchievementSummary> = {
  [Tab.INTERNATIONAL]: {
    gold: 2,
    silver: 1,
    bronze: 2,
    total: 5,
    changes: { gold: 1, silver: 0, bronze: 1 }
  },
  [Tab.DOMESTIC]: {
    gold: 156,
    silver: 142,
    bronze: 189,
    total: 487,
    changes: { gold: 12, silver: 15, bronze: 22 }
  },
  [Tab.LEGAL]: { gold: 0, silver: 0, bronze: 0, total: 15, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.PROCUREMENT_KITS]: { gold: 0, silver: 0, bronze: 0, total: 85, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.PROCUREMENT_CONSUMABLES]: { gold: 0, silver: 0, bronze: 0, total: 120, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.PROCUREMENT_NON_CONSUMABLES]: { gold: 0, silver: 0, bronze: 0, total: 45, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.FUND_UTILISATION]: { gold: 0, silver: 0, bronze: 0, total: 92, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.FINANCE]: { gold: 0, silver: 0, bronze: 0, total: 230, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.AUDIT_REPORTS]: { gold: 0, silver: 0, bronze: 0, total: 12, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.INFRA_TENDERS]: { gold: 0, silver: 0, bronze: 0, total: 34, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.INFRA_PROJECTS]: { gold: 0, silver: 0, bronze: 0, total: 56, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.VIP_GRIEVANCE]: { gold: 0, silver: 0, bronze: 0, total: 18, changes: { gold: 0, silver: 0, bronze: 0 } },
  [Tab.PENDING_ISSUES]: { gold: 0, silver: 0, bronze: 0, total: 9, changes: { gold: 0, silver: 0, bronze: 0 } }
};

const MOCK_REGIONAL: RegionalData[] = [
  { id: '1', name: 'RC Patiala', stc: 'NCOE', discipline: 'Aero Sports & Cycling', medals: { gold: 1, silver: 0, bronze: 0 }, participation: 1 },
  { id: '2', name: 'RC Bangalore', stc: 'STC', discipline: 'Athletics', medals: { gold: 8, silver: 12, bronze: 15 }, participation: 62 },
  { id: '3', name: 'RC Sonepat', stc: 'NCOE', discipline: 'Wrestling', medals: { gold: 15, silver: 5, bronze: 3 }, participation: 38 },
  { id: '4', name: 'RC Kolkata', stc: 'STC', discipline: 'Archery', medals: { gold: 5, silver: 7, bronze: 10 }, participation: 51 },
];

const MOCK_ATHLETES: AthleteData[] = [
  { id: 'p1', name: 'Aman Deep', gender: 'Male', state: 'Patiala', discipline: 'Cycling', ageGroup: 'Senior', competition: 'National Cycling Champs', medal: 'Gold', participation: true },
  { id: 'p2', name: 'Gurpreet Kaur', gender: 'Female', state: 'Patiala', discipline: 'Archery', ageGroup: 'Senior', competition: 'RC Invitational', medal: 'None', participation: true },
  { id: '1', name: 'Neeraj Chopra', gender: 'Male', state: 'Bangalore', discipline: 'Javelin Throw', ageGroup: 'Senior', competition: 'Diamond League', medal: 'Gold', participation: true },
  { id: '2', name: 'Nikhat Zareen', gender: 'Female', state: 'Telangana', discipline: 'Boxing', ageGroup: 'Senior', competition: 'World Championships', medal: 'Gold', participation: true },
  { id: '3', name: 'Praggnanandhaa R', gender: 'Male', state: 'Chennai', discipline: 'Chess', ageGroup: 'Junior', competition: 'FIDE World Cup', medal: 'Silver', participation: true },
  { id: '4', name: 'Antim Panghal', gender: 'Female', state: 'Sonepat', discipline: 'Wrestling', ageGroup: 'Senior', competition: 'Asian Games', medal: 'Bronze', participation: true },
];

const MOCK_MEDAL_RECORDS: MedalRecord[] = [
  {
    id: 'm1',
    rcName: 'RC Patiala',
    discipline: 'Boxing',
    event: 'World Boxing Championships 2026',
    medal: 'Gold',
    month: 'May',
    athletes: [
      { id: 'a1', name: 'Nikhat Zareen', gender: 'Female', state: 'Telangana', discipline: 'Boxing', ageGroup: 'Senior', competition: 'World Championships', medal: 'Gold', participation: true }
    ]
  },
  {
    id: 'm2',
    rcName: 'RC Bangalore',
    discipline: 'Athletics',
    event: 'Diamond League - Doha',
    medal: 'Gold',
    month: 'May',
    athletes: [
      { id: 'a2', name: 'Neeraj Chopra', gender: 'Male', state: 'Haryana', discipline: 'Javelin Throw', ageGroup: 'Senior', competition: 'Diamond League', medal: 'Gold', participation: true }
    ]
  },
  {
    id: 'm3',
    rcName: 'RC Sonepat',
    discipline: 'Wrestling',
    event: 'Asian Championships',
    medal: 'Silver',
    month: 'May',
    athletes: [
      { id: 'a3', name: 'Bajrang Punia', gender: 'Male', state: 'Haryana', discipline: 'Wrestling', ageGroup: 'Senior', competition: 'Asian Championships', medal: 'Silver', participation: true }
    ]
  },
  {
    id: 'm4',
    rcName: 'RC Patiala',
    discipline: 'Boxing',
    event: 'World Boxing Championships 2026',
    medal: 'Bronze',
    month: 'May',
    athletes: [
      { id: 'a4', name: 'Lovlina Borgohain', gender: 'Female', state: 'Assam', discipline: 'Boxing', ageGroup: 'Senior', competition: 'World Championships', medal: 'Bronze', participation: true }
    ]
  },
  {
    id: 'm5',
    rcName: 'RC Sonepat',
    discipline: 'Wrestling',
    event: 'Asian Championships',
    medal: 'Bronze',
    month: 'May',
    athletes: [
      { id: 'a5', name: 'Vinesh Phogat', gender: 'Female', state: 'Haryana', discipline: 'Wrestling', ageGroup: 'Senior', competition: 'Asian Championships', medal: 'Bronze', participation: true }
    ]
  }
];

interface FundUtilisationData {
  id: string;
  rcName: string;
  allocationNature: string;
  sanctionAmount: number;
  expenditureToDate: number;
  utilizationPercentage: number;
  committedExpenditure: number;
  achieved: 'Yes' | 'No';
}

interface PendingIssue {
  id: string;
  rcName: string;
  particulars: string;
  fileNumber: string;
  lastCorrespondence: string;
  division: string;
  status: string;
  remarks: string;
}

interface GrievanceData {
  id: string;
  rcName: string;
  regNo: string;
  applicant: string;
  subject: string;
  dateReceipt: string;
  mode: string;
  dateDisposal: string;
  pendingBeyond15: string;
  reasons: string;
}

interface VipReferenceData {
  id: string;
  rcName: string;
  refNo: string;
  particulars: string;
  dateReceipt: string;
  status: string;
  pendingBeyond1Week: string;
  reasons: string;
}

interface AuditReportData {
  id: string;
  rcName: string;
  auditNature: string;
  parasRaised: number;
  repliesSubmitted: number;
  repliesNotSubmitted: number;
  parasSettled: number;
  remarks: string;
}

interface FinanceItem {
  id: string;
  slNo: string;
  head: string;
  amount: number | null;
  isHeader?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
  level?: number;
}

interface ConsumableEquipmentData {
  id: string;
  centerName: string;
  sanctionAmount: number;
  expenditureToDate: number;
  utilizationPercentage: number;
  committedExpenditure: number;
  achieved: 'Yes' | 'No' | '-';
}

interface NonConsumableEquipmentData {
  id: string;
  rcName: string;
  procurementNature: string;
  sanctionAmount: number;
  expenditureToDate: number;
  utilizationPercentage: number;
  committedExpenditure: number;
  achieved: 'Yes' | 'No' | '-';
}

interface LegalCase {
  id: string;
  sn: string;
  rcName: string;
  limbsNo: string;
  courtName: string;
  caseNumber: string;
  caseTitle: string;
  caseCategory: string;
  caseBrief: string;
  lastHearing: string;
  nextHearing: string;
  interimOrder: string;
  interimOrderDate: string;
  advocateName: string;
  remarks: string;
}

interface InfraProjectData {
  id: string;
  rcName: string;
  projectName: string;
  location: string;
  head: string;
  agency: string;
  approvedCost: number;
  tenderCost: number;
  fundsReleased: number;
  progressLastWeek: string;
  progressPresentWeek: string;
  startDate: string;
  contractualCompletionDate: string;
  probableCompletionDate: string;
  remarks: string;
}

interface InfraTenderData {
  id: string;
  rcName: string;
  projectName: string;
  budgetApprovedDate: string;
  sanctionedCost: string;
  finalDateDE: string;
  committedFloatingDate: string;
  committedFinalisationDate: string;
  expectedFloatingDate: string;
  expectedFinalisationDate: string;
  executedBy: string;
  remarks: string;
  category: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'achievement' | 'legal' | 'finance' | 'infra';
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'New Achievement',
    message: 'Neeraj Chopra won Gold at Diamond League - Doha.',
    time: '2 hours ago',
    type: 'achievement',
    read: false
  },
  {
    id: 'n2',
    title: 'Upcoming Hearing',
    message: 'Legal hearing for C Krishnakumar case tomorrow at CAT, Ernakulam.',
    time: '5 hours ago',
    type: 'legal',
    read: false
  },
  {
    id: 'n3',
    title: 'Fund Allotted',
    message: 'New fund allotment of 5.2Cr for RC Guwahati released.',
    time: '1 day ago',
    type: 'finance',
    read: true
  },
  {
    id: 'n4',
    title: 'Tender Float',
    message: 'New tender for SITC LT panel floated for RC Trivandrum.',
    time: '2 days ago',
    type: 'infra',
    read: true
  }
];

const MOCK_FUND_UTILISATION: FundUtilisationData[] = [
  { id: 'f1', rcName: 'RC Patiala', allocationNature: 'Block Grant ANSF', sanctionAmount: 5000000, expenditureToDate: 3500000, utilizationPercentage: 70, committedExpenditure: 500000, achieved: 'Yes' },
  { id: 'f2', rcName: 'RC Bangalore', allocationNature: 'Khelo India', sanctionAmount: 8000000, expenditureToDate: 4000000, utilizationPercentage: 50, committedExpenditure: 1000000, achieved: 'No' },
  { id: 'f3', rcName: 'RC Sonepat', allocationNature: 'Block Grant ANSF', sanctionAmount: 3000000, expenditureToDate: 2800000, utilizationPercentage: 93, committedExpenditure: 100000, achieved: 'Yes' },
  { id: 'f4', rcName: 'RC Kolkata', allocationNature: 'Khelo India', sanctionAmount: 4500000, expenditureToDate: 1500000, utilizationPercentage: 33, committedExpenditure: 500000, achieved: 'No' },
  { id: 'f5', rcName: 'RC Imphal', allocationNature: 'Block Grant ANSF', sanctionAmount: 6000000, expenditureToDate: 5400000, utilizationPercentage: 90, committedExpenditure: 300000, achieved: 'Yes' },
  { id: 'f6', rcName: 'RC Gandhi Nagar', allocationNature: 'Khelo India', sanctionAmount: 3500000, expenditureToDate: 3000000, utilizationPercentage: 85, committedExpenditure: 200000, achieved: 'Yes' },
  { id: 'f7', rcName: 'RC Lucknow', allocationNature: 'Block Grant ANSF', sanctionAmount: 5500000, expenditureToDate: 2200000, utilizationPercentage: 40, committedExpenditure: 800000, achieved: 'No' },
  { id: 'f8', rcName: 'RC Bhopal', allocationNature: 'Khelo India', sanctionAmount: 4000000, expenditureToDate: 3200000, utilizationPercentage: 80, committedExpenditure: 400000, achieved: 'Yes' },
  { id: 'f9', rcName: 'RC Trivandrum', allocationNature: 'Block Grant ANSF', sanctionAmount: 4800000, expenditureToDate: 3600000, utilizationPercentage: 75, committedExpenditure: 600000, achieved: 'Yes' },
  { id: 'f10', rcName: 'RC Guwahati', allocationNature: 'Khelo India', sanctionAmount: 5200000, expenditureToDate: 1040000, utilizationPercentage: 20, committedExpenditure: 900000, achieved: 'No' },
  { id: 'f11', rcName: 'RC Chandigarh', allocationNature: 'Block Grant ANSF', sanctionAmount: 3800000, expenditureToDate: 3420000, utilizationPercentage: 90, committedExpenditure: 150000, achieved: 'Yes' },
  { id: 'f12', rcName: 'RC Mumbai', allocationNature: 'Khelo India', sanctionAmount: 7000000, expenditureToDate: 4550000, utilizationPercentage: 65, committedExpenditure: 1200000, achieved: 'Yes' },
];

const MOCK_PENDING_ISSUES: PendingIssue[] = [
  { 
    id: 'p1', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs. 19,15,665 for procurement of Non Consumable Rowing Equipment', 
    fileNumber: 'Comp No: 120621', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  },
  { 
    id: 'p2', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs. 23,04,000 for procurement of Non Consumable Cycling Equipment', 
    fileNumber: 'Comp No: 120479', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  },
  { 
    id: 'p3', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs. 3,83,892 for procurement of Non Consumable Scientific Equipment', 
    fileNumber: 'Comp No: 112834', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  },
  { 
    id: 'p4', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs. 73,24,008 for procurement of Non Consumable Canoeing & Kayaking Equipment', 
    fileNumber: 'Comp No: 108355', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  },
  { 
    id: 'p5', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs.40,05,294 to meet the various expenditure of NCC under RC Trivandrum- Sanction has been issued (SO No.862 dated 30/03/2026) from HQ but fund not received at RC', 
    fileNumber: 'Comp No: 112018', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  },
  { 
    id: 'p6', 
    rcName: 'RC Trivandrum', 
    particulars: 'Fund demand of Rs. 3,25,000 for procurement of Non Consumable Scientific Equipment', 
    fileNumber: 'Comp No: 119326', 
    lastCorrespondence: 'e-file has been sent to SAI HQ', 
    division: 'Finance', 
    status: 'Pending', 
    remarks: '' 
  }
];

const MOCK_GRIEVANCES: GrievanceData[] = [
  { id: 'g1', rcName: 'RC Patiala', regNo: 'PGRAY/E/2024/001', applicant: 'Rajesh Kumar', subject: 'Delay in pension processing', dateReceipt: '12-04-2024', mode: 'Online', dateDisposal: '20-04-2024', pendingBeyond15: 'Nil', reasons: 'Processed' },
  { id: 'g2', rcName: 'RC Bangalore', regNo: 'PGRAY/E/2024/015', applicant: 'Anita Singh', subject: 'Salary arrears calculation', dateReceipt: '05-04-2024', mode: 'Offline', dateDisposal: '-', pendingBeyond15: '12 Days', reasons: 'Pending verification from HR' },
  { id: 'g3', rcName: 'RC Kolkata', regNo: 'PGRAY/E/2024/022', applicant: 'S. Mukherjee', subject: 'Maintenance of hostel facilities', dateReceipt: '15-03-2024', mode: 'Online', dateDisposal: '-', pendingBeyond15: '45 Days', reasons: 'Requirement of special budget approval' }
];

const MOCK_VIP_REFERENCES: VipReferenceData[] = [
  { id: 'v1', rcName: 'RC Bhopal', refNo: 'VIP/2024/DEL/012', particulars: 'Construction of synthetic track', dateReceipt: '10-04-2024', status: 'Reply Sent', pendingBeyond1Week: 'Nil', reasons: '-' },
  { id: 'v2', rcName: 'RC Chandigarh', refNo: 'VIP/2024/HR/005', particulars: 'Upgradation of medical facility', dateReceipt: '25-03-2024', status: 'Not Sent', pendingBeyond1Week: '3 Weeks', reasons: 'Pending technical report from PWD' },
  { id: 'v3', rcName: 'RC Guwahati', refNo: 'VIP/2024/AS/019', particulars: 'New scholarship program for tribes', dateReceipt: '02-05-2024', status: 'Not Sent', pendingBeyond1Week: 'Nil', reasons: 'Under consideration at HQ' }
];

const MOCK_INFRA_TENDERS: InfraTenderData[] = [
  {
    id: 't1',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'SITC of outdoor type LT panel board by replacing old panels at LNCPE campus',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '16-10-2024',
    committedFinalisationDate: '20-11-2024',
    expectedFloatingDate: '10.02.2026',
    expectedFinalisationDate: '30.05.2026',
    executedBy: 'CPWD',
    remarks: '-'
  },
  {
    id: 't2',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'Repairing of street light poles and replacing damaged street light cables etc at LNCPE, Trivandrum',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '15.08.2025',
    committedFinalisationDate: '20.09.2025',
    expectedFloatingDate: '07.12.2025',
    expectedFinalisationDate: '25.05.2026',
    executedBy: 'CPWD',
    remarks: '-'
  },
  {
    id: 't3',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'Constrution of two wheeler parking shed',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '30.01.2026',
    committedFinalisationDate: '10.02.2026',
    expectedFloatingDate: '23.02.2026',
    expectedFinalisationDate: '11.04.2026',
    executedBy: 'By centre',
    remarks: 'Work order issued'
  },
  {
    id: 't4',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'Replacing existing roofing with aluminium sheet over the Gymanstics Indoor hall at SAI Thalassery',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '03.01.2026',
    committedFinalisationDate: '30.01.2026',
    expectedFloatingDate: '16.04.2026',
    expectedFinalisationDate: '22.04.2026',
    executedBy: 'CPWD',
    remarks: 'Tender floated by CPWD'
  },
  {
    id: 't5',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'Construction of Compoundwall around 300 bedded Girls hostel',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '10.05.2026',
    committedFinalisationDate: '23.05.2026',
    expectedFloatingDate: '30.05.2026',
    expectedFinalisationDate: '03.06.2026',
    executedBy: 'By centre',
    remarks: '-'
  },
  {
    id: 't6',
    category: 'Minor Capital Works',
    rcName: 'RC Trivandrum',
    projectName: 'Providing additional industrial socket outlet for kitchen including electrical distribution from existing substation at 300 bedded Hostel',
    budgetApprovedDate: '-',
    sanctionedCost: '-',
    finalDateDE: '-',
    committedFloatingDate: '20.05.2026',
    committedFinalisationDate: '28.05.2026',
    expectedFloatingDate: '07.06.2026',
    expectedFinalisationDate: '15.07.2026',
    executedBy: 'CPWD',
    remarks: '-'
  }
];

const MOCK_AUDIT_REPORTS: AuditReportData[] = [
  { id: 'a1', rcName: 'Trivandrum', auditNature: 'CAG Audit', parasRaised: 12, repliesSubmitted: 12, repliesNotSubmitted: 0, parasSettled: 0, remarks: 'All replies submitted on Time' },
  { id: 'a2', rcName: 'Trivandrum', auditNature: 'Internal Audit', parasRaised: 265, repliesSubmitted: 265, repliesNotSubmitted: 0, parasSettled: 0, remarks: 'All replies submitted on Time' },
  { id: 'a3', rcName: 'Trivandrum', auditNature: 'Performance Audit', parasRaised: 94, repliesSubmitted: 94, repliesNotSubmitted: 0, parasSettled: 0, remarks: 'All replies submitted on Time' },
  { id: 'a4', rcName: 'Trivandrum', auditNature: 'MHRD Audit', parasRaised: 0, repliesSubmitted: 0, repliesNotSubmitted: 0, parasSettled: 0, remarks: 'All replies submitted on Time' }
];

const MOCK_FINANCE: FinanceItem[] = [
  { id: 'f1', slNo: 'A', head: 'SALARY', amount: 6.53, isHeader: true },
  { id: 'f2', slNo: 'B', head: 'GENERAL', amount: null, isHeader: true },
  { id: 'f3', slNo: '1', head: 'CIVIL', amount: 0.06, level: 1 },
  { id: 'f4', slNo: '2', head: 'OTHER THAN CIVIL', amount: 0.48, level: 1 },
  { id: 'f5', slNo: '3', head: 'ACADEMICS', amount: 0.46, level: 1 },
  { id: 'f6', slNo: '4', head: 'PUBLICITY & ADVERTISEMENT', amount: 0.00, level: 1 },
  { id: 'f7', slNo: '5', head: 'ADMINISTRATIVE EXPENSES INCLUDING EQUIPMENT', amount: 0.01, level: 1 },
  { id: 'f8', slNo: '6', head: 'KITCHEN EQUIPMENTS', amount: 0.00, level: 1 },
  { id: 'f9', slNo: '7', head: 'Misc.', amount: null, level: 1 },
  { id: 'f10', slNo: '8', head: 'SAP', amount: null, level: 1 },
  { id: 'f11', slNo: '', head: 'SUBTOTAL (1 to 8)', amount: 1.01, isSubtotal: true },
  { id: 'f12', slNo: '9', head: 'OPERATIONAL SCHEME', amount: null, isHeader: true },
  { id: 'f13', slNo: '(i)', head: 'NCOE', amount: 0.73, level: 2 },
  { id: 'f14', slNo: '(ii)', head: 'STC', amount: 0.03, level: 2 },
  { id: 'f15', slNo: '(iii)', head: 'NSTC and Other Schemes', amount: null, level: 2 },
  { id: 'f16', slNo: '(iv)', head: 'Foreign Comp. Exposure', amount: null, level: 2 },
  { id: 'f17', slNo: '(v)', head: 'IGMA, EXT. C, Cash award', amount: null, level: 2 },
  { id: 'f18', slNo: '', head: 'SUBTOTAL (i to v)', amount: 0.76, isSubtotal: true },
  { id: 'f19', slNo: '10', head: 'CONSUMABLE EQUIPMENT', amount: null, isHeader: true },
  { id: 'f20', slNo: '(i)', head: 'NCOE', amount: 0.13, level: 2 },
  { id: 'f21', slNo: '(ii)', head: 'STC', amount: null, level: 2 },
  { id: 'f22', slNo: '', head: 'SUBTOTAL (i to ii)', amount: 0.13, isSubtotal: true },
  { id: 'f23', slNo: '', head: 'OPERATIONS TOTAL (9+10)', amount: 0.00, isSubtotal: true },
  { id: 'f24', slNo: '', head: 'Total-General', amount: 1.90, isSubtotal: true },
  { id: 'f25', slNo: '11', head: 'NON CONSUMABLE EQUIPMENT', amount: null, isHeader: true },
  { id: 'f26', slNo: 'i', head: 'Sports', amount: null, level: 1 },
  { id: 'f27', slNo: 'ii', head: 'Scientific', amount: null, level: 1 },
  { id: 'f28', slNo: '', head: 'Total(Non-Consumable)', amount: 0.00, isSubtotal: true },
  { id: 'f29', slNo: 'C', head: 'CAPITAL', amount: null, isHeader: true },
  { id: 'f30', slNo: 'i', head: 'Minor Works (RD Power)', amount: null, level: 1 },
  { id: 'f31', slNo: '2', head: 'Major Works', amount: null, level: 1 },
  { id: 'f32', slNo: '', head: 'TOTAL (A+B+C)', amount: 8.43, isTotal: true }
];

const MOCK_CONSUMABLES: ConsumableEquipmentData[] = [
  { id: 'c1', centerName: 'NCOE Trivandrum', sanctionAmount: 128, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 10, achieved: '-' },
  { id: 'c2', centerName: 'NCOE Alleppey', sanctionAmount: 43, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 4, achieved: '-' },
  { id: 'c3', centerName: 'STC Kollam', sanctionAmount: 10, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
  { id: 'c4', centerName: 'STC Thrissur', sanctionAmount: 5, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0.5, achieved: '-' },
  { id: 'c5', centerName: 'STC Calicut', sanctionAmount: 5, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0.5, achieved: '-' },
  { id: 'c6', centerName: 'STC Thalassery', sanctionAmount: 8, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
  { id: 'c7', centerName: 'STC Chennai', sanctionAmount: 8, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
  { id: 'c8', centerName: 'STC Salem', sanctionAmount: 5, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0.5, achieved: '-' },
  { id: 'c9', centerName: 'STC Mayiladuthurai', sanctionAmount: 10, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
  { id: 'c10', centerName: 'STC Puducherry', sanctionAmount: 8, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
  { id: 'c11', centerName: 'STC Yanam', sanctionAmount: 5, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0.5, achieved: '-' },
  { id: 'c12', centerName: 'STC Androth', sanctionAmount: 8, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 1, achieved: '-' },
];

const MOCK_NON_CONSUMABLES: NonConsumableEquipmentData[] = [
  { id: 'nc1', rcName: 'RC Trivandrum', procurementNature: 'Sports Equipment', sanctionAmount: 16.87, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0.5, achieved: '-' },
  { id: 'nc2', rcName: 'RC Trivandrum', procurementNature: 'Sports Science Equipment', sanctionAmount: 0, expenditureToDate: 0, utilizationPercentage: 0, committedExpenditure: 0, achieved: '-' },
];

const MOCK_LEGAL_CASES: LegalCase[] = [
  {
    id: 'l1',
    sn: '1',
    rcName: 'Trivandrum',
    limbsNo: '1328160',
    courtName: 'CAT, Ernakulam',
    caseNumber: 'O A No: 180/81/2024',
    caseTitle: 'C Krishnakumar v. Dept. of Sports & Ors',
    caseCategory: 'Service matters',
    caseBrief: 'The petitioner is a retired employee. It is claimed that even though the petitioner was promoted to the designation of Assistant Director in the year 2011 no corresponding financial benefits were granted till date even after submission of several representations to SAI HO. Hence the present O A.',
    lastHearing: '10.04.2026',
    nextHearing: '13.07.2026',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'C Manmadan',
    remarks: ''
  },
  {
    id: 'l2',
    sn: '2',
    rcName: 'Trivandrum',
    limbsNo: '126430',
    courtName: 'CAT, Ernakulam',
    caseNumber: 'O A No: 180/376/2016',
    caseTitle: 'Muraleedharan V v. MYAS and Others',
    caseCategory: 'Service matters',
    caseBrief: 'The petitioner retired from SAI as Assistant Librarian. He was initially appointed as LDC in Libarary and the designation of Assistant Librarian was granted in the year 2014 only. The present petition has been filed to grant the scale of pay of Rs 1400-2600 w.e.f. 05.09.1990 and Rs 5500-9000 w.e.f. 1.1.1996 with arrears, i.e, from the date of joining in SAI',
    lastHearing: '11.03.2026',
    nextHearing: '12.06.2026',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'C Manmadan',
    remarks: ''
  },
  {
    id: 'l3',
    sn: '3',
    rcName: 'Trivandrum',
    limbsNo: '550861',
    courtName: 'CAT, Ernakulam',
    caseNumber: 'O A No: 180/750/2017',
    caseTitle: 'Joseph Thomas v. MYAS and Others',
    caseCategory: 'Service matters',
    caseBrief: 'Filed for retirement benefits. To release full salary for the period of suspension direction to pay pension retirement gratuity and other retirement benefits',
    lastHearing: '17.02.2026',
    nextHearing: '11.06.2026',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'C Manmadan',
    remarks: ''
  },
  {
    id: 'l4',
    sn: '4',
    rcName: 'Trivandrum',
    limbsNo: '1377969',
    courtName: 'CAT, Ernakulam',
    caseNumber: 'O A No: 180/278/2023',
    caseTitle: 'Ashwas SS v. Ministry of Railways and Others',
    caseCategory: 'Service matters',
    caseBrief: 'The petitioner was selected as the Coach for Olympics 2026 by SAI. But the parent organization Railway Board refused to spare his service. The present petition has been filed to spare service of the applicant by the Southern railway for deputation in SAI',
    lastHearing: '09.03.2026',
    nextHearing: '26.05.2026',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'C Manmadan',
    remarks: ''
  },
  {
    id: 'l5',
    sn: '5',
    rcName: 'Trivandrum',
    limbsNo: '399891',
    courtName: 'HC Kerala',
    caseNumber: 'W P (C) No. 24064/2016',
    caseTitle: 'Anu V S v. UOI & Ors',
    caseCategory: 'Non service matter',
    caseBrief: 'With the limited information available the petitioner was not selected for the games even after fulfilling eligibility criteria.',
    lastHearing: '04.09.2025',
    nextHearing: '04.09.2025- Matter not listed afterwards',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'C Manmadan',
    remarks: ''
  },
  {
    id: 'l6',
    sn: '6',
    rcName: 'Trivandrum',
    limbsNo: '1328163',
    courtName: 'HC Kerala',
    caseNumber: 'W P (C) No: 33658/2023',
    caseTitle: 'Sh. Satheesh Kumar v. Kerala Sports Council and Others',
    caseCategory: 'Non service matter',
    caseBrief: 'Sports Authority of India represented by its Director General, Jawaharlal Nehru Stadium Complex (East Gate), Lodhi Road, New Delhi, pin -110003 is arrayed as the 3rd Respondent in the above matter. The petitioner is a retired Inspector of Central Industrial Security Force. He was selected in CISF Central Swimming team in the year 1996 in Sports Quota. As per the order of SAI, the Sports Council of Kerala, who is arrayed as the First Respondent in the Writ Petition is the nodal agency for implementing Khelo India Scheme in Kerala. On 25.10.2022 Sports Council of Kerala invited applications from eligible candidates for 12 Sports disciplines including swimming to appoint as Coach. The petitioner and the 2nd Respondent have participated in the selection process. According to the Petitioner even though he was the only eligible candidate who has participated in the selection process, the second Respondent was selected for the post. Aggrieved by this the petitioner has preferred WP (C) No: 38094/2022 before this Hon’ble High Court which was dismissed as per Ext P-19 Judgment. Aggrieved the Hon’ble Division Bench allowed the Writ Appeal as per Ext P-20 Judgement. The appointment of the 2nd respondent was quashed and matter was remitted back to the 1st respondent for re-consideration. However, the 1st respondent threw caution to the winds and issued Order stating that the petitioner has no qualification whatsoever for appointment as swimming trainer. Aggrieved by the said order the present Writ Petition is preferred.',
    lastHearing: '10.09.2024',
    nextHearing: '10.09.2024- Matter not listed afterwards',
    interimOrder: 'N/A',
    interimOrderDate: 'N/A',
    advocateName: 'O.M. Shalina',
    remarks: ''
  },
];

const MOCK_INFRA_PROJECTS: InfraProjectData[] = [
  {
    id: 'p1',
    rcName: 'RC Trivandrum',
    projectName: "Construction 300 bedded Girl's hostel at SAI RC trivandrum",
    location: 'RC Trivandrum',
    head: 'Khelo India',
    agency: 'WAPCOS',
    approvedCost: 34.80,
    tenderCost: 32.88,
    fundsReleased: 32.15,
    progressLastWeek: '100 %',
    progressPresentWeek: '100 %',
    startDate: '03.10.2019',
    contractualCompletionDate: '02.04.2021',
    probableCompletionDate: '31.01.2025',
    remarks: 'Work completed. Financially not settled'
  },
  {
    id: 'p2',
    rcName: 'RC Trivandrum',
    projectName: 'Extension of medical centre at SAI LNCPE',
    location: 'RC Trivandrum',
    head: 'Minor works',
    agency: 'CPWD',
    approvedCost: 0.99,
    tenderCost: 0.62,
    fundsReleased: 0.62,
    progressLastWeek: '100 %',
    progressPresentWeek: '100 %',
    startDate: '18.04.2024',
    contractualCompletionDate: '17.09.2024',
    probableCompletionDate: '20.02.2025',
    remarks: 'Work completed. Financially not settled'
  },
  {
    id: 'p3',
    rcName: 'RC Trivandrum',
    projectName: 'SITC of 400 KVA Onan type outdoor transformer, cabling, termination at LNCPE campus',
    location: 'RC Trivandrum',
    head: 'Minor works',
    agency: 'CPWD',
    approvedCost: 0.40,
    tenderCost: 0.24,
    fundsReleased: 0.40,
    progressLastWeek: '100 %',
    progressPresentWeek: '100 %',
    startDate: '30.09.2025',
    contractualCompletionDate: '29.03.2026',
    probableCompletionDate: '29.03.2026',
    remarks: 'Work completed. Financially not settled'
  },
  {
    id: 'p4',
    rcName: 'RC Trivandrum',
    projectName: 'Converting the space between the dormitory into an indoor hall for',
    location: 'RC Trivandrum',
    head: 'Minor works',
    agency: 'M/s Anand Constructions and Infra solutions',
    approvedCost: 0.12,
    tenderCost: 0.11,
    fundsReleased: 0.00,
    progressLastWeek: '100 %',
    progressPresentWeek: '100 %',
    startDate: '12.03.2026',
    contractualCompletionDate: '11.04.2026',
    probableCompletionDate: '07.04.2026',
    remarks: 'Work completed. Financially not settled'
  },
  {
    id: 'p5',
    rcName: 'RC Trivandrum',
    projectName: 'Installation of CCTV in 300 bedded hostel',
    location: 'RC Trivandrum',
    head: 'Minor works',
    agency: 'M/s 3 M electronics solutions, chennai',
    approvedCost: 0.12,
    tenderCost: 0.12,
    fundsReleased: 0.00,
    progressLastWeek: '90 %',
    progressPresentWeek: '95 %',
    startDate: '10.04.2026',
    contractualCompletionDate: '25.04.2026',
    probableCompletionDate: '25.05.2026',
    remarks: 'Work is in progress'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.INTERNATIONAL);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCumulative, setIsCumulative] = useState(false);
  const [expandedRegionalIds, setExpandedRegionalIds] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const toggleRegionalRow = (id: string) => {
    setExpandedRegionalIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const expandAllRegional = () => {
    setExpandedRegionalIds(MOCK_REGIONAL.map(r => r.id));
  };

  const collapseAllRegional = () => {
    setExpandedRegionalIds([]);
  };

  const toggleAllRegional = () => {
    if (expandedRegionalIds.length === MOCK_REGIONAL.length) {
      collapseAllRegional();
    } else {
      expandAllRegional();
    }
  };

  const summary = MOCK_SUMMARY[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 flex overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/20 blur-[120px] rounded-full -z-10" />

      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 88 : 360 }}
        className="border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0 shrink-0 relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className={`flex-1 custom-scrollbar transition-all duration-300 ${isCollapsed ? 'overflow-visible p-4' : 'overflow-y-auto p-6'}`}>
          <div className={`flex items-center mb-10 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-4 pl-2'}`}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-blue-500/20 border-2 border-white ring-1 ring-slate-100"
            >
              <img 
                src="https://play-lh.googleusercontent.com/ObOkXGLi0m9R3XL9pQ9dE9jRFYIoQmZ0WH4oDvXtLl6KqA49RxefU2RGAz41ImKgnNY=w240-h480-rw" 
                alt="Khel Setu Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <h1 className="font-sans font-semibold text-xl tracking-tight text-slate-900 leading-none">KHEL SETU</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.15em]">HQ Dashboard</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.nav 
            variants={{
              show: { transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            animate="show"
            className="space-y-1"
          >
            <div className="pb-4">
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1 }
                    }}
                    className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4"
                  >
                    Navigation
                  </motion.p>
                )}
              </AnimatePresence>
              <NavItem 
                icon={<Globe size={18} />} 
                label="International Achievements" 
                active={activeTab === Tab.INTERNATIONAL}
                onClick={() => setActiveTab(Tab.INTERNATIONAL)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<MapPin size={18} />} 
                label="Domestic Achievements" 
                active={activeTab === Tab.DOMESTIC}
                onClick={() => setActiveTab(Tab.DOMESTIC)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<Gavel size={18} />} 
                label="Legal Matters" 
                active={activeTab === Tab.LEGAL}
                onClick={() => setActiveTab(Tab.LEGAL)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<Package size={18} />} 
                label="Procurement (Kits & Shoes)" 
                active={activeTab === Tab.PROCUREMENT_KITS}
                onClick={() => setActiveTab(Tab.PROCUREMENT_KITS)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<ShoppingBag size={18} />} 
                label="Procurement (Consumables)" 
                active={activeTab === Tab.PROCUREMENT_CONSUMABLES}
                onClick={() => setActiveTab(Tab.PROCUREMENT_CONSUMABLES)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<Box size={18} />} 
                label="Procurement (Non-Consumables)" 
                active={activeTab === Tab.PROCUREMENT_NON_CONSUMABLES}
                onClick={() => setActiveTab(Tab.PROCUREMENT_NON_CONSUMABLES)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<PieChart size={18} />} 
                label="Fund Utilisation" 
                active={activeTab === Tab.FUND_UTILISATION}
                onClick={() => setActiveTab(Tab.FUND_UTILISATION)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<IndianRupee size={18} />} 
                label="Finance" 
                active={activeTab === Tab.FINANCE}
                onClick={() => setActiveTab(Tab.FINANCE)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<FileText size={18} />} 
                label="Audit Reports" 
                active={activeTab === Tab.AUDIT_REPORTS}
                onClick={() => setActiveTab(Tab.AUDIT_REPORTS)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<ClipboardList size={18} />} 
                label="Infrastructure Tenders" 
                active={activeTab === Tab.INFRA_TENDERS}
                onClick={() => setActiveTab(Tab.INFRA_TENDERS)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<Building2 size={18} />} 
                label="Infrastructure Projects" 
                active={activeTab === Tab.INFRA_PROJECTS}
                onClick={() => setActiveTab(Tab.INFRA_PROJECTS)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<Users size={18} />} 
                label="VIP & Grievance" 
                active={activeTab === Tab.VIP_GRIEVANCE}
                onClick={() => setActiveTab(Tab.VIP_GRIEVANCE)}
                collapsed={isCollapsed}
              />
              <NavItem 
                icon={<AlertCircle size={18} />} 
                label="Pending Issues" 
                active={activeTab === Tab.PENDING_ISSUES}
                onClick={() => setActiveTab(Tab.PENDING_ISSUES)}
                collapsed={isCollapsed}
              />
            </div>
          </motion.nav>
        </div>

        <div className="mt-auto p-4 border-t border-[#E5E7EB] bg-gray-50/50" ref={notificationRef}>
          {/* Notifications Button */}
          <div className="relative mb-4">
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[100] ${isCollapsed ? 'w-72 -left-2' : 'w-full'}`}
                >
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-full">
                        {unreadCount} NEW
                      </span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div 
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer relative ${!n.read ? 'bg-blue-50/30' : ''}`}
                        >
                          {!n.read && (
                            <div className="absolute left-1 top-4 w-1 h-1 rounded-full bg-blue-600" />
                          )}
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{n.title}</span>
                            <span className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Clock size={10} />
                              {n.time}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 leading-snug">{n.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-xs text-slate-400 font-medium">No notifications</p>
                      </div>
                    )}
                  </div>
                  <button className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:bg-blue-50 border-t border-slate-100 transition-colors">
                    View All Activity
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className={`w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50/50 group ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="relative">
                <Bell size={18} className={`${unreadCount > 0 ? 'text-blue-600' : 'text-gray-400'} group-hover:text-blue-600 transition-colors`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Notifications</span>
              )}
            </motion.button>
          </div>

          <div className={`flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm transition-all ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border border-blue-200 shrink-0">
              <User size={20} className="text-blue-600" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                className="overflow-hidden"
              >
                <p className="font-semibold text-sm truncate">Admin User</p>
                <p className="text-[11px] text-gray-500 truncate">System Administrator</p>
              </motion.div>
            )}
          </div>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full mt-4 flex items-center p-3 text-gray-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-blue-100 grayscale hover:grayscale-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
          >
            {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Collapse Menu</span>}
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-8 py-6 h-screen">
        {/* Toggle and Export Buttons */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-bold tracking-tight text-slate-900 leading-none">
              {activeTab === Tab.INTERNATIONAL && 'International Achievements'}
              {activeTab === Tab.DOMESTIC && 'Domestic Achievements'}
              {activeTab === Tab.LEGAL && 'Legal Matters'}
              {activeTab === Tab.FUND_UTILISATION && 'Fund Utilisation'}
              {activeTab === Tab.PENDING_ISSUES && 'Pending Issues'}
              {activeTab === Tab.VIP_GRIEVANCE && 'VIP & Grievance'}
              {activeTab === Tab.INFRA_TENDERS && 'Infrastructure Tenders'}
              {activeTab === Tab.INFRA_PROJECTS && 'Infrastructure Projects'}
              {activeTab === Tab.AUDIT_REPORTS && 'Audit Reports'}
              {activeTab === Tab.FINANCE && 'Finance'}
              {activeTab === Tab.PROCUREMENT_KITS && 'Procurement (Kits & Shoes)'}
              {activeTab === Tab.PROCUREMENT_CONSUMABLES && 'Procurement (Consumables)'}
              {activeTab === Tab.PROCUREMENT_NON_CONSUMABLES && 'Procurement (Non-Consumables)'}
            </h2>
            <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
              {activeTab === Tab.INTERNATIONAL && 'Global performance metrics and medal analysis across international sports competitions.'}
              {activeTab === Tab.DOMESTIC && 'Detailed tracking of national-level sports achievements and regional training center rankings.'}
              {activeTab === Tab.LEGAL && 'Centralized management of ongoing legal cases, court proceedings, and judicial status.'}
              {activeTab === Tab.FUND_UTILISATION && 'Real-time monitoring of financial allocations, disbursements, and expenditure efficiency.'}
              {activeTab === Tab.PENDING_ISSUES && 'Tracking unresolved administrative matters and correspondence status with SAI headquarters.'}
              {activeTab === Tab.VIP_GRIEVANCE && 'Monitoring and resolution tracking for grievance cases and VIP references.'}
              {activeTab === Tab.INFRA_TENDERS && 'Operational tracking of tender floating, technical evaluations, and finalisations.'}
              {activeTab === Tab.INFRA_PROJECTS && 'Comprehensive oversight of active infrastructure development and facility upgrades.'}
              {activeTab === Tab.AUDIT_REPORTS && 'CAG, Internal, and Performance audit observation tracking and settlement status.'}
              {activeTab === Tab.FINANCE && 'Strategic expenditure analysis under SAI Grant with year-on-year trends.'}
              {activeTab === Tab.PROCUREMENT_KITS && 'Status of annual kit and shoe procurement for athletes for the current fiscal year.'}
              {activeTab === Tab.PROCUREMENT_CONSUMABLES && 'Inventory and delivery status for consumable equipment and training gear.'}
              {activeTab === Tab.PROCUREMENT_NON_CONSUMABLES && 'High-performance sports and scientific equipment procurement tracking.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {![Tab.LEGAL, Tab.PROCUREMENT_KITS, Tab.PENDING_ISSUES, Tab.VIP_GRIEVANCE, Tab.INFRA_TENDERS, Tab.INFRA_PROJECTS, Tab.AUDIT_REPORTS, Tab.FINANCE, Tab.PROCUREMENT_CONSUMABLES, Tab.PROCUREMENT_NON_CONSUMABLES].includes(activeTab) && (
              <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-200/50 backdrop-blur-sm relative h-[46px]">
                <button 
                  onClick={() => setIsCumulative(false)}
                  className={`relative px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 z-10 ${!isCumulative ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {!isCumulative && (
                    <motion.div
                      layoutId="toggle-bg"
                      className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  MAY
                </button>
                <button 
                  onClick={() => setIsCumulative(true)}
                  className={`relative px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 z-10 ${isCumulative ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {isCumulative && (
                    <motion.div
                      layoutId="toggle-bg"
                      className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  TILL MAY 2026
                </button>
              </div>
            )}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all"
            >
              <Download size={16} />
              <span>Export Report</span>
            </motion.button>
          </div>
        </header>

        {/* Summary Cards */}
        {![Tab.LEGAL, Tab.PROCUREMENT_KITS, Tab.FUND_UTILISATION, Tab.PENDING_ISSUES, Tab.VIP_GRIEVANCE, Tab.INFRA_TENDERS, Tab.INFRA_PROJECTS, Tab.AUDIT_REPORTS, Tab.FINANCE, Tab.PROCUREMENT_CONSUMABLES, Tab.PROCUREMENT_NON_CONSUMABLES].includes(activeTab) && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 pl-1">
              <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Quick Statistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <SummaryCard 
                label="Gold Medals" 
                value={summary.gold} 
                change={summary.changes.gold}
                color="text-amber-500"
                bgColor="bg-amber-50"
                icon={<Trophy size={24} />}
              />
              <SummaryCard 
                label="Silver Medals" 
                value={summary.silver} 
                change={summary.changes.silver}
                color="text-slate-400"
                bgColor="bg-slate-50"
                icon={<Trophy size={24} />}
              />
              <SummaryCard 
                label="Bronze Medals" 
                value={summary.bronze} 
                change={summary.changes.bronze}
                color="text-orange-600"
                bgColor="bg-orange-50"
                icon={<Trophy size={24} />}
              />
              <SummaryCard 
                label="Total Participation" 
                value={summary.total} 
                change={0}
                color="text-blue-600"
                bgColor="bg-blue-50"
                icon={<Users size={24} />}
              />
            </div>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="space-y-12">
          {activeTab === Tab.LEGAL ? (
            <LegalMattersDashboard />
          ) : activeTab === Tab.PROCUREMENT_KITS ? (
            <KitsAndShoesDashboard />
          ) : activeTab === Tab.FUND_UTILISATION ? (
            <FundUtilisationDashboard />
          ) : activeTab === Tab.PROCUREMENT_CONSUMABLES ? (
            <ConsumablesDashboard />
          ) : activeTab === Tab.PROCUREMENT_NON_CONSUMABLES ? (
            <NonConsumablesDashboard />
          ) : activeTab === Tab.PENDING_ISSUES ? (
            <PendingIssuesDashboard />
          ) : activeTab === Tab.VIP_GRIEVANCE ? (
            <VipGrievanceDashboard />
          ) : activeTab === Tab.INFRA_TENDERS ? (
            <InfraTendersDashboard />
          ) : activeTab === Tab.INFRA_PROJECTS ? (
            <InfraProjectsDashboard />
          ) : activeTab === Tab.AUDIT_REPORTS ? (
            <AuditReportsDashboard />
          ) : activeTab === Tab.FINANCE ? (
            <FinanceDashboard />
          ) : activeTab === Tab.INTERNATIONAL ? (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-1">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Regional Centre Performance</h3>
                  <p className="text-sm text-slate-500 font-medium">Drill-down analysis across regional hubs. Click any row to view details.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleAllRegional}
                    className={`flex items-center gap-2 px-5 py-2 text-[10px] font-bold uppercase tracking-widest bg-white shadow-sm border rounded-xl transition-all duration-300 ${
                      expandedRegionalIds.length === MOCK_REGIONAL.length 
                      ? 'text-slate-500 border-slate-200 hover:bg-slate-50' 
                      : 'text-blue-600 border-blue-100 hover:bg-blue-50'
                    }`}
                  >
                    {expandedRegionalIds.length === MOCK_REGIONAL.length ? (
                      <>
                        <Minimize2 size={14} />
                        Collapse All
                      </>
                    ) : (
                      <>
                        <Maximize2 size={14} />
                        Expand All
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200">
                        <th className="w-16 px-6 py-5 border-r border-slate-100"></th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">RC Name</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">STC / NCOE</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Discipline</th>
                        <th className="px-6 py-5 text-[10px] font-black text-amber-500 uppercase tracking-widest text-center border-r border-slate-100 w-24">Gold</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-24">Silver</th>
                        <th className="px-6 py-5 text-[10px] font-black text-orange-600 uppercase tracking-widest text-center border-r border-slate-100 w-24">Bronze</th>
                        <th className="px-6 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest text-center w-24">Participation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {MOCK_REGIONAL.filter(row => {
                        const athletes = MOCK_ATHLETES.filter(a => a.state === row.name.replace('RC ', ''));
                        return athletes.some(a => a.medal !== 'None' || a.participation);
                      }).map((row, idx) => (
                        <ExpandableRegionalRow 
                          key={row.id} 
                          row={row} 
                          idx={idx} 
                          isExpanded={expandedRegionalIds.includes(row.id)}
                          onToggle={() => toggleRegionalRow(row.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-1">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Regional Centre Achievement Details</h3>
                  <p className="text-sm text-slate-500 font-medium">Summary of performance across different regional hubs. Click to expand.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleAllRegional}
                    className={`flex items-center gap-2 px-5 py-2 text-[10px] font-bold uppercase tracking-widest bg-white shadow-sm border rounded-xl transition-all duration-300 ${
                      expandedRegionalIds.length === MOCK_REGIONAL.length 
                      ? 'text-slate-500 border-slate-200 hover:bg-slate-50' 
                      : 'text-blue-600 border-blue-100 hover:bg-blue-50'
                    }`}
                  >
                    {expandedRegionalIds.length === MOCK_REGIONAL.length ? (
                      <>
                        <Minimize2 size={14} />
                        Collapse All
                      </>
                    ) : (
                      <>
                        <Maximize2 size={14} />
                        Expand All
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200">
                        <th className="w-16 px-6 py-5 border-r border-slate-100"></th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">RC Name</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">STC / NCOE</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Discipline</th>
                        <th className="px-6 py-5 text-[10px] font-black text-amber-500 uppercase tracking-widest text-center border-r border-slate-100 w-24">Gold</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-24">Silver</th>
                        <th className="px-6 py-5 text-[10px] font-black text-orange-600 uppercase tracking-widest text-center border-r border-slate-100 w-24">Bronze</th>
                        <th className="px-6 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest text-center w-24">Participation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {MOCK_REGIONAL.filter(row => {
                        const athletes = MOCK_ATHLETES.filter(a => a.state === row.name.replace('RC ', ''));
                        return athletes.some(a => a.medal !== 'None' || a.participation);
                      }).map((row, idx) => (
                        <ExpandableRegionalRow 
                          key={row.id} 
                          row={row} 
                          idx={idx} 
                          isExpanded={expandedRegionalIds.includes(row.id)}
                          onToggle={() => toggleRegionalRow(row.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
 )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void, collapsed?: boolean }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
      className="relative px-2 py-0.5"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ x: collapsed ? 0 : 4 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 relative group
          ${active 
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
          ${collapsed ? 'justify-center px-0' : ''}
        `}
      >
        <div className={`
          shrink-0 transition-transform duration-300 group-hover:scale-110
          ${active ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-600'}
        `}>
          {icon}
        </div>
        {!collapsed && (
          <span className={`text-sm font-semibold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
            {label}
          </span>
        )}
        {active && !collapsed && (
          <motion.div 
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]"
          />
        )}
      </motion.button>
    </motion.div>
  );
}

function LegalMattersDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[2000px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center w-12">S.N.</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name of RC</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Limbs No.</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Court Name</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Case Number</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[200px]">Case Title</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Case Category</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Case Brief</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Hearing</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-red-500">Next Hearing</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interim Order</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advocate Name</th>
                <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEGAL_CASES.map((row, idx) => (
                <LegalCaseRow key={row.id} row={row} idx={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function LegalCaseRow({ row, idx }: { row: LegalCase; idx: number; key?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
        className="border-b last:border-0 border-[#F3F4F6] hover:bg-gray-50/50 transition-colors group cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-4 py-5 text-sm font-mono text-gray-400 text-center border-r border-[#F3F4F6]">{row.sn}</td>
        <td className="px-4 py-5 font-bold text-sm text-gray-800 border-r border-[#F3F4F6]">{row.rcName}</td>
        <td className="px-4 py-5 text-center text-sm font-mono text-gray-500 border-r border-[#F3F4F6]">{row.limbsNo}</td>
        <td className="px-4 py-5 text-sm text-gray-600 border-r border-[#F3F4F6] font-medium">{row.courtName}</td>
        <td className="px-4 py-5 text-sm text-blue-600 font-bold border-r border-[#F3F4F6]">{row.caseNumber}</td>
        <td className="px-4 py-5 border-r border-[#F3F4F6]">
          <p className="text-sm text-gray-800 font-bold leading-tight max-w-[200px]">{row.caseTitle}</p>
        </td>
        <td className="px-4 py-5 border-r border-[#F3F4F6]">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight ${
            row.caseCategory.includes('Non') ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            {row.caseCategory}
          </span>
        </td>
        <td className="px-4 py-5 border-r border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 line-clamp-1 max-w-[250px]">{row.caseBrief}</p>
            <ChevronDown size={14} className={`text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </td>
        <td className="px-4 py-5 text-sm text-gray-500 border-r border-[#F3F4F6]">{row.lastHearing}</td>
        <td className="px-4 py-5 text-sm text-red-600 font-bold border-r border-[#F3F4F6]">{row.nextHearing}</td>
        <td className="px-4 py-5 text-sm text-gray-500 border-r border-[#F3F4F6]">{row.interimOrder}</td>
        <td className="px-4 py-5 text-sm font-bold text-gray-800 border-r border-[#F3F4F6]">{row.advocateName}</td>
        <td className="px-4 py-5 text-sm text-gray-400 italic">
          {row.remarks || '-'}
        </td>
      </motion.tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={13} className="p-0 border-none">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-50/80 border-b border-[#F3F4F6] p-8 shadow-inner"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={16} className="text-blue-600" />
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Detailed Case Brief</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium text-sm whitespace-pre-wrap">
                    {row.caseBrief}
                  </p>
                  
                  {row.interimOrder !== 'N/A' && (
                    <div className="mt-6 p-4 bg-white border border-blue-100 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Gavel size={14} className="text-blue-600" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Interim Order Details ({row.interimOrderDate})</h4>
                      </div>
                      <p className="text-sm text-gray-600">{row.interimOrder}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

function SummaryCard({ label, value, change, color, bgColor, icon }: { label: string, value: number, change: number, color: string, bgColor: string, icon: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white p-8 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center shadow-lg shadow-black/5`}>
            <div className={color}>{icon}</div>
          </div>
          {change !== 0 && (
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
              change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {change >= 0 ? '+' : ''}{change}%
              <ArrowUpRight size={10} className={change < 0 ? 'rotate-90' : ''} />
            </div>
          )}
        </div>
        
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-5xl font-display font-bold text-slate-900 tracking-tighter">
            <CountUp value={value} />
          </h4>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100/50 overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
          className={`h-full ${color.replace('text-', 'bg-')}`} 
        />
      </div>
    </motion.div>
  );
}

function CountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: circOut
      const easeProgress = Math.sqrt(1 - Math.pow(progress - 1, 2));
      
      const current = Math.floor(easeProgress * (value - startValue) + startValue);
      setDisplayValue(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
}

function PendingIssuesDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20 text-center border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Regional Center</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest max-w-[350px] border-r border-slate-100">Issue Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">File Number</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Division</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PENDING_ISSUES.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-black text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="font-display font-bold text-sm text-slate-900 uppercase tracking-tight">{row.rcName}</div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <p className="text-sm text-slate-600 leading-relaxed max-w-[350px] font-medium">
                      {row.particulars}
                    </p>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/50 text-blue-700 text-[10px] font-black border border-blue-100 uppercase tracking-widest">
                      <FileText size={12} className="text-blue-400" />
                      {row.fileNumber}
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50 font-black text-[10px] text-indigo-600 uppercase tracking-widest">
                    {row.division}
                  </td>
                  <td className="px-6 py-6 text-center border-r border-slate-50">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-[0.15em] border border-orange-100 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs text-slate-400 italic font-medium leading-relaxed">
                    {row.remarks || 'No critical remarks recorded'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function VipGrievanceDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-16">
      {/* Grievance Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-blue-600 rounded-full" />
          <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight uppercase">Grievance Overview</h3>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 w-48">Regional Center</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 w-40">Regn No.</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 w-48">Applicant</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 w-64">Subject</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-40">Receipt Date</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-32">Mode</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-40">Status</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pendency Reason</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_GRIEVANCES.map((row, idx) => (
                  <motion.tr 
                    key={row.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b last:border-0 border-slate-100 table-row-hover transition-colors"
                  >
                    <td className="px-6 py-6 text-[11px] font-mono font-bold text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                    <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                    <td className="px-6 py-6 text-xs font-bold text-blue-600 border-r border-slate-50 tracking-tight">{row.regNo}</td>
                    <td className="px-6 py-6 text-sm text-slate-700 font-bold border-r border-slate-50 tracking-tight">{row.applicant}</td>
                    <td className="px-6 py-6 text-sm text-slate-600 font-medium border-r border-slate-50 leading-snug">{row.subject}</td>
                    <td className="px-6 py-6 text-xs font-bold text-slate-500 border-r border-slate-50 text-center uppercase tracking-widest">{row.dateReceipt}</td>
                    <td className="px-6 py-6 text-center border-r border-slate-50">
                      <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-slate-100 text-slate-500 border border-slate-100 uppercase tracking-widest">
                        {row.mode}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center border-r border-slate-50">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-tight ${row.pendingBeyond15 === 'Nil' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {row.pendingBeyond15 === 'Nil' ? 'Resolved' : 'Pending'}
                        </span>
                        {row.pendingBeyond15 !== 'Nil' && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100 uppercase tracking-widest">
                            {row.pendingBeyond15}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-slate-400 italic font-medium leading-relaxed">{row.reasons}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIP References Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-indigo-600 rounded-full" />
          <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight uppercase">VIP References</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-indigo-50/20 border-b border-indigo-100">
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 border-r border-indigo-50">SN</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-indigo-50 w-48">Regional Center</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-indigo-50 w-48">Reference No.</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-indigo-50">Particulars</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-indigo-50 w-40">Status</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-48">Pendency</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VIP_REFERENCES.map((row, idx) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b last:border-0 border-indigo-50/50 hover:bg-indigo-50/10 transition-colors"
                  >
                    <td className="px-6 py-6 text-[11px] font-mono font-bold text-slate-400 text-center border-r border-indigo-50/30">{idx + 1}</td>
                    <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-indigo-50/30 uppercase tracking-tight">{row.rcName}</td>
                    <td className="px-6 py-6 text-[11px] font-bold text-indigo-600 border-r border-indigo-50/30 tracking-widest uppercase">{row.refNo}</td>
                    <td className="px-6 py-6 text-sm text-slate-600 font-medium border-r border-indigo-50/30 leading-relaxed font-sans">{row.particulars}</td>
                    <td className="px-6 py-6 text-center border-r border-indigo-50/30">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
                        row.status === 'Nil' ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {row.status === 'Nil' ? 'Not Required' : row.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-xs text-rose-500 font-bold border-indigo-50/30 italic">
                      {row.pendingBeyond1Week === 'Nil' ? '-' : row.pendingBeyond1Week}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuditReportsDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1500px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Regional Center</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[250px] border-r border-slate-100">Nature of Audit</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100">Raised</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100">Submitted</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100">Pending</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-32">Settled</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AUDIT_REPORTS.map((row, idx) => (
                <motion.tr 
                   key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-bold text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100 uppercase tracking-widest">
                      {row.auditNature}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-bold text-slate-700 border-r border-slate-50">{row.parasRaised}</td>
                  <td className="px-6 py-6 text-center text-sm text-emerald-600 font-bold border-r border-slate-50">{row.repliesSubmitted}</td>
                  <td className="px-6 py-6 text-center text-sm text-rose-600 font-bold border-r border-slate-50">{row.repliesNotSubmitted}</td>
                  <td className="px-6 py-6 text-center text-sm text-blue-600 font-bold border-r border-slate-50 bg-blue-50/20">{row.parasSettled}</td>
                  <td className="px-6 py-6 text-xs text-slate-400 italic font-medium leading-relaxed">
                    {row.remarks}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FinanceDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-32 border-r border-slate-100">Sl.No.</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Head of Account</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-48 text-right">Amount (Cr.)</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FINANCE.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  className={`border-b last:border-0 border-slate-100 transition-colors group ${
                    row.isHeader ? 'bg-slate-50/30' : 
                    row.isSubtotal ? 'bg-amber-50/20' : 
                    row.isTotal ? 'bg-blue-50/30' :
                    'hover:bg-slate-50/50'
                  }`}
                >
                  <td className={`px-8 py-6 text-sm font-mono border-r border-slate-50 text-center ${row.isHeader || row.isSubtotal || row.isTotal ? 'font-bold text-slate-900' : 'text-slate-400'}`}>
                    {row.slNo}
                  </td>
                  <td className={`px-8 py-6 text-sm border-r border-slate-50 ${
                    row.isHeader ? 'font-sans font-bold text-slate-800 uppercase tracking-tight' : 
                    row.isSubtotal || row.isTotal ? 'font-bold text-slate-900' : 
                    'text-slate-600 font-semibold'
                  }`}>
                    <div style={{ marginLeft: row.level ? `${row.level * 2}rem` : 0 }} className="flex items-center gap-2">
                      {!row.isHeader && !row.isTotal && row.level > 0 && <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                      {row.head}
                    </div>
                  </td>
                  <td className={`px-8 py-6 text-right font-mono tracking-tighter ${
                    row.isTotal ? 'text-2xl font-bold text-blue-600' : 
                    row.isSubtotal ? 'text-lg font-bold text-slate-900' : 
                    'text-sm text-slate-500 font-bold'
                  }`}>
                    {row.amount !== null ? (
                      <span className="flex items-center justify-end gap-1">
                        <span className="text-[10px] text-slate-300 font-bold mr-1">₹</span>
                        {row.amount.toFixed(2)}
                      </span>
                    ) : ''}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-12 flex items-start gap-6 p-8 bg-blue-50/30 border border-blue-100 rounded-3xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-blue-900/5 flex items-center justify-center shrink-0">
          <Info className="text-blue-600" size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-2">Financial Disclosure & Notes</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-3xl">
            All figures presented are in Indian Crores (Cr). Data reflects confirmed expenditures and committed amounts as of the current reporting cycle under the SAI Grant provision. Subtotals are calculated based on division-wise allocations.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

interface KitShoesProcurement {
  id: string;
  category: 'General Kit' | 'Specific Kit' | 'Warmup Shoe' | 'Specific Shoe';
  rcName: string;
  hubs: string[];
  statusMessage: string;
}

const MOCK_KITS_SHOES: KitShoesProcurement[] = [
  {
    id: 'ks1',
    category: 'General Kit',
    rcName: 'RC Trivandrum',
    hubs: [
      'NCOE Trivandrum', 'NCOE Alleppey', 'STC Kollam', 'STC Thrissur', 'STC Calicut',
      'STC Thalassery', 'STC Chennai', 'STC Salem', 'STC Mayiladuthurai', 'STC Puduchery',
      'STC Yanam', 'STC Androth'
    ],
    statusMessage: 'Procurement for the year 2026–27 has not yet commenced due to the non-finalization of vendors by SAI Head Office. The supply order will be issued by the Regional Centre only after finalization of vendors and completion of the new induction process, which is presently on hold due to the non-issuance of sanctioned strength for the year 2026–27.'
  },
  {
    id: 'ks2',
    category: 'Specific Kit',
    rcName: 'RC Trivandrum',
    hubs: ['NCOE Trivandrum (Athletics)', 'NCOE Alleppey'],
    statusMessage: 'Procurement for the year 2026–27 has not yet commenced due to the non-finalization of vendors by SAI Head Office. The supply order will be issued by the Regional Centre only after finalization of vendors and completion of the new induction process, which is presently on hold due to the non-issuance of sanctioned strength for the year 2026–27.'
  },
  {
    id: 'ks3',
    category: 'Warmup Shoe',
    rcName: 'RC Trivandrum',
    hubs: [
      'NCOE Trivandrum', 'NCOE Alleppey', 'STC Kollam', 'STC Thrissur', 'STC Calicut',
      'STC Thalassery', 'STC Chennai', 'STC Salem', 'STC Mayiladuthurai', 'STC Puduchery',
      'STC Yanam', 'STC Androth'
    ],
    statusMessage: 'Procurement for the year 2026–27 has not yet commenced due to the non-finalization of vendors by SAI Head Office. The supply order will be issued by the Regional Centre only after finalization of vendors and completion of the new induction process, which is presently on hold due to the non-issuance of sanctioned strength for the year 2026–27.'
  },
  {
    id: 'ks4',
    category: 'Specific Shoe',
    rcName: 'RC Trivandrum',
    hubs: ['NCOE Trivandrum (Athletics)', 'NCOE Alleppey'],
    statusMessage: 'Procurement for the year 2026–27 has not yet commenced due to the non-finalization of vendors by SAI Head Office. The supply order will be issued by the Regional Centre only after finalization of vendors and completion of the new induction process, which is presently on hold due to the non-issuance of sanctioned strength for the year 2026–27.'
  }
];

function KitsAndShoesDashboard() {
  const kitData = MOCK_KITS_SHOES.filter(item => item.category.includes('Kit'));
  const shoeData = MOCK_KITS_SHOES.filter(item => item.category.includes('Shoe'));

  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-16">
      {/* Sports Kit Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-2">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
          <div>
            <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight uppercase">Sports Kit Procurement</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Status Report (INR)</p>
          </div>
        </div>

        {kitData.map((section) => (
          <div key={section.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">{section.category}</h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase bg-white px-3 py-1 rounded-full border border-slate-100">{section.rcName}</span>
            </div>
            <div className="overflow-x-auto text-[13px]">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-slate-50/20 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 w-64 text-center">Implementation Site</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Order Date</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Received</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Distributed</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Payment</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Lab Test</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Executive Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b last:border-0 border-slate-100">
                    <td className="px-8 py-8 border-r border-slate-50">
                      <div className="flex flex-col gap-2.5">
                        {section.hubs.map((hub, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-3 group">
                             <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                             <span className="text-slate-800 font-bold tracking-tight group-hover:text-blue-600 transition-colors uppercase text-[11px]">{hub}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td colSpan={6} className="px-10 py-10 bg-slate-50/10">
                      <div className="max-w-3xl">
                        <div className="flex items-start gap-5 p-8 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                           <AlertCircle size={28} className="text-orange-400 shrink-0 mt-0.5" />
                           <p className="text-sm leading-relaxed font-bold text-slate-600 italic">
                             {section.statusMessage}
                           </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Sports Shoes Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-2">
          <div className="w-1.5 h-8 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]" />
          <div>
            <h3 className="text-2xl font-sans font-bold text-slate-900 tracking-tight uppercase">Sports Shoes Procurement</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Inventory Management Status</p>
          </div>
        </div>

        {shoeData.map((section) => (
          <div key={section.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600">{section.category}</h4>
              <span className="text-[10px] font-black text-slate-400 uppercase bg-white px-3 py-1 rounded-full border border-slate-100">{section.rcName}</span>
            </div>
            <div className="overflow-x-auto text-[13px]">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-slate-50/20 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 w-64 text-center">Implementation Site</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Order Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Supplies In</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Distribution</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Settlement</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 text-center w-36">Quality Lab</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Executive Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b last:border-0 border-slate-100">
                    <td className="px-8 py-8 border-r border-slate-50">
                      <div className="flex flex-col gap-2.5">
                        {section.hubs.map((hub, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-3 group">
                             <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                             <span className="text-slate-800 font-bold tracking-tight group-hover:text-indigo-600 transition-colors uppercase text-[11px]">{hub}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td colSpan={6} className="px-10 py-10 bg-slate-50/10">
                      <div className="max-w-3xl">
                        <div className="flex items-start gap-5 p-8 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                           <AlertCircle size={28} className="text-orange-400 shrink-0 mt-0.5" />
                           <p className="text-sm leading-relaxed font-bold text-slate-600 italic">
                             {section.statusMessage}
                           </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConsumablesDashboard() {
  const totals = MOCK_CONSUMABLES.reduce((acc, curr) => ({
    sanction: acc.sanction + curr.sanctionAmount,
    expenditure: acc.expenditure + curr.expenditureToDate,
    committed: acc.committed + curr.committedExpenditure
  }), { sanction: 0, expenditure: 0, committed: 0 });

  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Name of Centre</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Sanction (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Expenditure</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-40">Utilization</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Committed</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CONSUMABLES.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-black text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.centerName}</td>
                  <td className="px-6 py-6 text-center text-sm font-mono font-black text-slate-700 border-r border-slate-50">{row.sanctionAmount.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center text-sm font-mono text-slate-500 border-r border-slate-50">{row.expenditureToDate.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center border-r border-slate-50">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[10px] font-black ${row.utilizationPercentage > 0 ? 'text-blue-600' : 'text-slate-300'}`}>
                        {row.utilizationPercentage}%
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.utilizationPercentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-mono font-black text-indigo-600 border-r border-slate-50">{row.committedExpenditure.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      row.achieved === '-' ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-900/5'
                    }`}>
                      {row.achieved}
                    </span>
                  </td>
                </motion.tr>
              ))}
              <tr className="bg-slate-900 text-white font-black">
                <td className="px-6 py-6 text-center italic opacity-30 border-r border-slate-800"></td>
                <td className="px-6 py-6 text-sm uppercase tracking-[0.2em] border-r border-slate-800 font-display">Grand Total</td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-blue-400">{totals.sanction.toFixed(2)}</td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-slate-300">{totals.expenditure.toFixed(2)}</td>
                <td className="px-6 py-6 text-center border-r border-slate-800">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-mono text-emerald-400">
                      {totals.sanction > 0 ? ((totals.expenditure / totals.sanction) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-indigo-300">{totals.committed.toFixed(2)}</td>
                <td className="px-6 py-6 text-center italic opacity-30"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function NonConsumablesDashboard() {
  const totals = MOCK_NON_CONSUMABLES.reduce((acc, curr) => ({
    sanction: acc.sanction + curr.sanctionAmount,
    expenditure: acc.expenditure + curr.expenditureToDate,
    committed: acc.committed + curr.committedExpenditure
  }), { sanction: 0, expenditure: 0, committed: 0 });

  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Name of RC</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Nature of Procurement</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Sanction (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Expenditure</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-40">Utilization</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Committed</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_NON_CONSUMABLES.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-black text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest border border-slate-200">
                      {row.procurementNature}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-mono font-black text-slate-700 border-r border-slate-50">{row.sanctionAmount.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center text-sm font-mono text-slate-500 border-r border-slate-50">{row.expenditureToDate.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center border-r border-slate-50">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[10px] font-black ${row.utilizationPercentage > 0 ? 'text-blue-600' : 'text-slate-300'}`}>
                        {row.utilizationPercentage}%
                      </span>
                      <div className="w-16 h-1 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.utilizationPercentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-mono font-black text-indigo-600 border-r border-slate-50">{row.committedExpenditure.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 text-slate-300`}>
                      {row.achieved}
                    </span>
                  </td>
                </motion.tr>
              ))}
              <tr className="bg-slate-900 text-white font-black">
                <td className="px-6 py-6 text-center italic opacity-30 border-r border-slate-800"></td>
                <td colSpan={2} className="px-6 py-6 text-sm uppercase tracking-[0.2em] border-r border-slate-800 font-display">Grand Total</td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-blue-400">{totals.sanction.toFixed(2)}</td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-slate-300">{totals.expenditure.toFixed(2)}</td>
                <td className="px-6 py-6 text-center border-r border-slate-800">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-mono text-emerald-400">
                      {totals.sanction > 0 ? ((totals.expenditure / totals.sanction) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center text-lg font-mono tracking-tighter border-r border-slate-800 text-indigo-300">{totals.committed.toFixed(2)}</td>
                <td className="px-6 py-6 text-center italic opacity-30"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function InfraProjectsDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[2200px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Regional Center</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[300px] border-r border-slate-100">Project Detail</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Agency</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-36">Approved (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-36">Tender (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-36">Released (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Progress (%)</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-40">Timeline</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INFRA_PROJECTS.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-bold text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-800 font-bold leading-snug tracking-tight">
                        {row.projectName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-widest">{row.head}</span>
                        <span className="text-[10px] text-slate-400 font-medium">@ {row.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <p className="text-[11px] font-bold text-slate-600 leading-snug uppercase tracking-tight">
                      {row.agency}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-bold text-blue-600 border-r border-slate-50 tracking-tighter">{row.approvedCost.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center text-sm font-bold text-slate-700 border-r border-slate-50 tracking-tighter">{row.tenderCost.toFixed(2)}</td>
                  <td className="px-6 py-6 text-center text-sm font-bold text-slate-500 border-r border-slate-50 tracking-tighter">{row.fundsReleased.toFixed(2)}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-between w-full px-2">
                         <span className="text-[9px] font-bold text-slate-300">CUR: {row.progressLastWeek}</span>
                         <span className="text-[10px] font-bold text-blue-600">{row.progressPresentWeek}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: row.progressPresentWeek.replace(' %', '%') }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "circOut" }}
                          className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target Completion:</span>
                      <span className="px-2 py-0.5 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-bold border border-orange-100 text-center uppercase tracking-tighter">
                        {row.probableCompletionDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-xs text-slate-400 italic font-medium leading-relaxed">
                    {row.remarks || '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function InfraTendersDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[2000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 border-r border-slate-100">SN</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Regional Center</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Project Detail</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-36">Sanctioned (Cr.)</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Committed Dates</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 w-48">Expected Dates</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 w-48">Executed By</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50/30">
                <td className="px-6 py-3 text-[11px] font-bold text-blue-600 text-center border-b border-blue-100">A.</td>
                <td colSpan={7} className="px-6 py-3 text-[11px] font-bold text-blue-600 border-b border-blue-100 uppercase tracking-[0.2em]">Minor Capital Works</td>
              </tr>
              {MOCK_INFRA_TENDERS.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-100 hover:bg-blue-50/10 transition-colors group"
                >
                  <td className="px-6 py-6 text-[11px] font-mono font-bold text-slate-400 text-center border-r border-slate-50">{idx + 1}</td>
                  <td className="px-6 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <p className="text-sm text-slate-800 font-bold leading-snug tracking-tight max-w-[400px]">
                      {row.projectName}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Approved: {row.budgetApprovedDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-bold text-blue-600 border-r border-slate-50 tracking-tighter">{row.sanctionedCost}</td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Floating / Finalisation</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600">{row.committedFloatingDate}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold text-emerald-600">{row.committedFinalisationDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Expected Floating / Finalisation</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-600">{row.expectedFloatingDate}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold text-indigo-600">{row.expectedFinalisationDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-slate-50">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-[10px] font-black border border-indigo-100 uppercase tracking-widest shadow-sm shadow-indigo-900/5">
                      {row.executedBy}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs text-slate-400 italic font-medium">
                    {row.remarks || '-'}
                  </td>
                </motion.tr>
              ))}
              <tr className="bg-slate-50/50">
                <td className="px-6 py-3 text-[11px] font-black text-slate-400 text-center border-b border-slate-200">B.</td>
                <td colSpan={7} className="px-6 py-3 text-[11px] font-black text-slate-400 border-b border-slate-200 uppercase tracking-[0.2em]">Civil Maintenance Works</td>
              </tr>
              <tr className="border-b last:border-0 border-slate-100">
                <td className="px-6 py-8 text-center" colSpan={8}>
                   <span className="text-sm font-sans font-bold text-slate-300 uppercase tracking-[0.3em]">No Projects Under Maintenance</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FundUtilisationDashboard() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Regional Centre</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">Nature of Allocations</th>
                <th className="px-8 py-5 text-[10px) font-black text-slate-400 uppercase tracking-widest text-right border-r border-slate-100">Sanction Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right border-r border-slate-100">Expenditure</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-r border-slate-100">Utilization</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right border-r border-slate-100">Committed</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FUND_UTILISATION.map((row, idx) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b last:border-0 border-slate-100 table-row-hover transition-colors group"
                >
                  <td className="px-8 py-6 font-display font-bold text-sm text-slate-900 border-r border-slate-50 uppercase tracking-tight">{row.rcName}</td>
                  <td className="px-8 py-6 border-r border-slate-50">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                      {row.allocationNature}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-black text-slate-800 text-sm border-r border-slate-50 tracking-tighter">
                    <span className="text-[10px] text-slate-300 mr-1 font-serif italic">₹</span>
                    {(row.sanctionAmount / 100000).toFixed(1)}L
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-black text-blue-600 text-sm border-r border-slate-50 tracking-tighter">
                    <span className="text-[10px] text-blue-200 mr-1 font-serif italic">₹</span>
                    {(row.expenditureToDate / 100000).toFixed(1)}L
                  </td>
                  <td className="px-8 py-6 border-r border-slate-50">
                    <div className="flex flex-col items-center gap-1.5 min-w-[140px]">
                      <div className="flex justify-between w-full px-1">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Progress</span>
                        <span className="text-[10px] font-black text-slate-900">{row.utilizationPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.utilizationPercentage}%` }}
                          transition={{ duration: 1.2, ease: "circOut" }}
                          className={`h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] ${
                            row.utilizationPercentage > 80 ? 'bg-emerald-500 shadow-emerald-500/20' : 
                            row.utilizationPercentage > 50 ? 'bg-blue-500 shadow-blue-500/20' : 
                            'bg-orange-500 shadow-orange-500/20'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-black text-slate-400 text-xs border-r border-slate-50 tracking-tighter">
                    <span className="text-[10px] text-slate-200 mr-1 font-serif italic">₹</span>
                    {(row.committedExpenditure / 100000).toFixed(1)}L
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      row.achieved === 'Yes' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-900/5' 
                        : 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-900/5'
                    }`}>
                      {row.achieved === 'Yes' ? 'On Track' : 'Delayed'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const ExpandableRegionalRow: React.FC<{ 
  row: RegionalData, 
  idx: number, 
  isExpanded: boolean, 
  onToggle: () => void 
}> = ({ row, idx, isExpanded, onToggle }) => {
  // Dynamic calculation based on MOCK_ATHLETES as per user request
  const athletes = MOCK_ATHLETES.filter(a => a.state === row.name.replace('RC ', ''));
  
  const counts = {
    gold: athletes.filter(a => a.medal === 'Gold').length,
    silver: athletes.filter(a => a.medal === 'Silver').length,
    bronze: athletes.filter(a => a.medal === 'Bronze').length,
    participation: athletes.filter(a => a.medal === 'None' && a.participation).length
  };

  return (
    <>
      <motion.tr 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
        onClick={onToggle}
        className={`border-b border-slate-100 table-row-hover cursor-pointer group ${isExpanded ? 'bg-slate-50' : 'bg-transparent'}`}
      >
        <td className="px-6 py-5 text-center">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`transition-colors duration-300 ${isExpanded ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </td>
        <td className="px-6 py-5">
          <span className="font-sans font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{row.name}</span>
        </td>
        <td className="px-6 py-5 font-mono text-xs font-bold text-slate-500 text-center border-r border-slate-50">
          <span className={`px-2.5 py-1 rounded-lg border ${
            row.stc === 'NCOE' ? 'bg-indigo-50/50 text-indigo-600 border-indigo-100' : 'bg-amber-50/50 text-amber-600 border-amber-100'
          }`}>
            {row.stc}
          </span>
        </td>
        <td className="px-6 py-5 border-r border-slate-50">
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{row.discipline}</span>
        </td>
        <td className="px-6 py-5 border-r border-slate-50">
          <div className="flex items-center justify-center gap-1.5">
            <div className={`w-2 h-2 rounded-full relative ${counts.gold > 0 ? 'bg-amber-400 animate-pulse' : 'bg-slate-200'}`}>
              {counts.gold > 0 && (
                <motion.div 
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [1, 2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-amber-400 rounded-full blur-[2px]"
                />
              )}
            </div>
            <span className="font-mono font-bold text-base text-slate-800 tracking-tighter">{counts.gold}</span>
          </div>
        </td>
        <td className="px-6 py-5 font-mono font-bold text-base text-slate-500 tracking-tighter text-center border-r border-slate-50">{counts.silver}</td>
        <td className="px-6 py-5 font-mono font-bold text-base text-orange-700 tracking-tighter text-center border-r border-slate-50">{counts.bronze}</td>
        <td className="px-6 py-5">
          <div className="flex items-center justify-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${counts.participation > 0 ? 'bg-blue-400 animate-pulse' : 'bg-slate-200'}`} />
            <span className="font-mono font-bold text-base text-blue-600 tracking-tighter">{counts.participation}</span>
          </div>
        </td>
      </motion.tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={8} className="px-0 py-0 overflow-hidden bg-gray-50/50">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-20 py-8 border-b border-gray-200 shadow-inner">
                  <div className="flex items-center gap-3 mb-6">
                    <Users size={16} className="text-blue-600" />
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Athlete breakdown for {row.name}</h5>
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                          <th className="px-8 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Athlete Name</th>
                          <th className="px-8 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Age Group</th>
                          <th className="px-8 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Competition</th>
                          <th className="px-8 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Medal Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {athletes.length > 0 ? athletes.map((athlete) => (
                          <tr key={athlete.id} className="border-b last:border-0 border-slate-100 hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm">
                                  <User size={16} />
                                </div>
                                <span className="font-bold text-sm text-slate-800 tracking-tight uppercase">{athlete.name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                {athlete.ageGroup}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-xs font-medium text-slate-500 truncate max-w-[300px] leading-relaxed italic">
                                {athlete.competition}
                              </p>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <MedalBadge medal={athlete.medal} />
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-8 py-12 text-center text-slate-300 text-sm font-black uppercase tracking-[0.2em] italic">
                               No matching athlete records
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};

const ExpandableMedalRow: React.FC<{ record: MedalRecord }> = ({ record }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.tr 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group ${isExpanded ? 'bg-slate-50' : 'bg-transparent'}`}
      >
        <td className="px-6 py-5 text-center">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`transition-colors duration-300 ${isExpanded ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </td>
        <td className="px-6 py-5">
          <span className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{record.rcName}</span>
        </td>
        <td className="px-6 py-5">
          <MedalBadge medal={record.medal} />
        </td>
        <td className="px-6 py-5">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.1em]">
            {record.discipline}
          </span>
        </td>
        <td className="px-6 py-5 text-sm font-medium text-slate-500 italic">{record.event}</td>
        <td className="px-6 py-5 text-right font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">{record.month}</td>
      </motion.tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={6} className="px-0 py-0 overflow-hidden bg-slate-50/50">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-20 py-10 border-b border-slate-200 shadow-inner">
                  <div className="flex items-center gap-2 mb-8">
                    <User size={16} className="text-blue-600" />
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Winning Athletes</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {record.athletes.map((athlete) => (
                      <motion.div 
                        key={athlete.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                          <User size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans font-bold text-slate-900 truncate uppercase tracking-tight">{athlete.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{athlete.state}</p>
                          {athlete.participation && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-1 h-1 rounded-full bg-emerald-500" />
                              <span className="text-[9px] font-bold text-emerald-600 uppercase">Verified</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

function WipeAnimation({ children, color = "bg-blue-600/10" }: { children: ReactNode, color?: string }) {
  return (
    <div className="relative overflow-hidden inline-block group rounded-lg">
      {children}
      <motion.div 
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`absolute inset-0 ${color} skew-x-[20deg] z-10 pointer-events-none`}
      />
    </div>
  );
}

function MedalBadge({ medal }: { medal: AthleteData['medal'] }) {
  const config = {
    Gold: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', wipe: 'bg-amber-400/20' },
    Silver: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', wipe: 'bg-slate-400/20' },
    Bronze: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', wipe: 'bg-orange-400/20' },
    None: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', wipe: 'bg-blue-400/20' },
  }[medal];

  return (
    <WipeAnimation color={config.wipe}>
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border shadow-sm block ${config.bg} ${config.text} ${config.border}`}>
        {medal === 'None' ? 'Participation' : medal}
      </span>
    </WipeAnimation>
  );
}
