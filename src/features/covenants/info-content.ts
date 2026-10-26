import type { InfobarContent } from '@/components/ui/infobar';

export const covenantsInfoContent: InfobarContent = {
  title: 'Covenant Compliance Tracking',
  sections: [
    {
      title: 'Overview',
      description:
        'The Covenants page tracks financial covenants attached to client lending facilities — leverage ratios, DSCR, net worth minimums, and similar tests. Each covenant records the threshold, test frequency, the date of the next test, and the current compliance status.',
      links: []
    },
    {
      title: 'Adding a Covenant',
      description:
        'Click "Add Covenant" to register a new covenant against a client facility. Specify the test type, the comparison operator and threshold, the testing frequency, and the next test date.',
      links: []
    },
    {
      title: 'Recording a Test Result',
      description:
        'Open a covenant and update "Last Tested Value" and "Status" once a period test is run. Status is one of Compliant, Breach, Waived, or Pending — set it manually here as the testing record of truth.',
      links: []
    },
    {
      title: 'Filtering & Search',
      description:
        'Use the covenant type and status filters to narrow the list — for example, to isolate every Breach across all clients, or every DSCR test due this quarter. Search matches client name, facility name, and covenant type.',
      links: []
    }
  ]
};
