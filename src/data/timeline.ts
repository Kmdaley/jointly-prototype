import type { Timeline } from '../types';

import dashboard from '../assets/dashboard.jpg';
import offerWorkspace from '../assets/offer-workspace.jpg';
import selectOffers from '../assets/select-offers.jpg';
import comparisonReport from '../assets/comparison-report.jpg';
import offerControls from '../assets/offer-controls.jpg';
import documentMapping from '../assets/document-mapping.jpg';

/**
 * SCREEN_BOUNDS describes where the laptop screen sits inside the stage,
 * expressed as percentages of the stage (0–100).
 *
 * Annotation `anchor` coordinates are stored in screen-relative percentages
 * (0–100 of the screen image); at render time they are remapped onto the
 * stage so cards and connector lines stay aligned at every viewport size.
 *
 * Annotation `card` coordinates are stored directly in stage percentages.
 */
export const SCREEN_BOUNDS = {
  x: 18,
  y: 14,
  width: 64,
  height: 58
} as const;

/** Default card dimensions, in stage percent, used for connector geometry. */
export const CARD_SIZE = {
  width: 16,
  height: 11
} as const;

export const timeline: Timeline = {
  sections: [
    {
      id: 'dashboard',
      index: 1,
      title: 'Dashboard',
      chapter: 'Operational visibility',
      caption:
        'A prioritized view of what needs attention before the day’s work begins.',
      screen: dashboard,
      duration: 20000,
      annotations: [
        {
          id: 'dashboard.priority',
          title: 'Priority before workload',
          body:
            'The day’s most consequential moment leads the screen, ahead of any open task or deal.',
          anchor: { x: 55, y: 7 },
          card: { x: 1, y: 14 },
          placement: 'right'
        },
        {
          id: 'dashboard.kanban',
          title: 'Mapped to how deals are tracked',
          body:
            'Kanban states mirror the working model agents already use—no new vocabulary to learn.',
          anchor: { x: 50, y: 36 },
          card: { x: 1, y: 50 },
          placement: 'right'
        },
        {
          id: 'dashboard.activity',
          title: 'One unified activity stream',
          body:
            'Replaces scattered tool notifications with a single feed of what moved on which deal.',
          anchor: { x: 86, y: 32 },
          card: { x: 83.5, y: 30 },
          placement: 'left'
        }
      ]
    },
    {
      id: 'offer-workspace',
      index: 2,
      title: 'Offer Workspace',
      chapter: 'Coordinating offers',
      caption:
        'All offers, tasks, and people for a property in one connected place.',
      screen: offerWorkspace,
      duration: 22000,
      annotations: [
        {
          id: 'workspace.top-offer',
          title: 'Top offer pre-identified with rationale',
          body:
            'Removes guesswork by surfacing not only which offer leads, but the reason it does.',
          anchor: { x: 80, y: 22 },
          card: { x: 83.5, y: 16 },
          placement: 'left'
        },
        {
          id: 'workspace.ranking',
          title: 'Decision factors at a glance',
          body:
            'Score-weighted bars rank offers visually before the agent commits to a deeper comparison.',
          anchor: { x: 45, y: 32 },
          card: { x: 1, y: 30 },
          placement: 'right'
        },
        {
          id: 'workspace.tasks',
          title: 'Coordination tied to the offer',
          body:
            'Tasks live next to the offer they belong to—closing the loop between deciding and doing.',
          anchor: { x: 88, y: 84 },
          card: { x: 83.5, y: 70 },
          placement: 'left'
        }
      ]
    },
    {
      id: 'select-offers',
      index: 3,
      title: 'Select Offers',
      chapter: 'Flexible comparison setup',
      caption:
        'Compare all offers, or any subset—the same pattern fits every shape of review.',
      screen: selectOffers,
      duration: 18000,
      annotations: [
        {
          id: 'select.flexible',
          title: 'Flexible comparison setup',
          body:
            'Compare all, or any subset—one selection pattern handles every multi-offer scenario.',
          anchor: { x: 88, y: 22 },
          card: { x: 1, y: 22 },
          placement: 'right'
        },
        {
          id: 'select.context',
          title: 'Property context kept in view',
          body:
            'A slide-over preserves the property panel, so selection happens without losing the bigger picture.',
          anchor: { x: 40, y: 50 },
          card: { x: 1, y: 50 },
          placement: 'right'
        },
        {
          id: 'select.cta',
          title: 'One action launches the report',
          body:
            'Generate Report converts intent into a polished, shareable artifact in a single step.',
          anchor: { x: 92, y: 93 },
          card: { x: 1, y: 78 },
          placement: 'right'
        }
      ]
    },
    {
      id: 'comparison-report',
      index: 4,
      title: 'Comparison Report',
      chapter: 'Confident evaluation',
      caption:
        'A side-by-side report grouped by the dimensions that actually drive decisions.',
      screen: comparisonReport,
      duration: 24000,
      annotations: [
        {
          id: 'report.top-offer',
          title: 'Top offer anchors the comparison',
          body:
            'A pre-flagged column gives a default reference point and a clean visual baseline for the rest.',
          anchor: { x: 45, y: 34 },
          card: { x: 1, y: 30 },
          placement: 'right'
        },
        {
          id: 'report.grouping',
          title: 'Grouped by decision dimension',
          body:
            'Categories reflect what an agent actually evaluates—not the order fields appear on the contract.',
          anchor: { x: 26, y: 82 },
          card: { x: 1, y: 64 },
          placement: 'right'
        },
        {
          id: 'report.handoff',
          title: 'Comparison pivots into action',
          body:
            'Offer Controls bridges evaluation and execution, so the report doesn’t dead-end into a PDF.',
          anchor: { x: 90, y: 19 },
          card: { x: 83.5, y: 16 },
          placement: 'left'
        }
      ]
    },
    {
      id: 'offer-controls',
      index: 5,
      title: 'Offer Controls',
      chapter: 'Transaction actions',
      caption:
        'Only the next moves that fit the current state of the deal are shown.',
      screen: offerControls,
      duration: 20000,
      annotations: [
        {
          id: 'controls.state-aware',
          title: 'Actions tied to transaction state',
          body:
            'Only valid next moves for the selected offer appear—reducing accidental, off-state actions.',
          anchor: { x: 88, y: 44 },
          card: { x: 1, y: 36 },
          placement: 'right'
        },
        {
          id: 'controls.two-step',
          title: 'Two-step gate prevents mistakes',
          body:
            'Choosing offer and action separately forces a confirmation moment before anything sends.',
          anchor: { x: 88, y: 62 },
          card: { x: 1, y: 60 },
          placement: 'right'
        },
        {
          id: 'controls.continuity',
          title: 'Execution flows from comparison',
          body:
            'Continue carries the comparison context forward into document mapping—no re-entry step.',
          anchor: { x: 92, y: 93 },
          card: { x: 1, y: 80 },
          placement: 'right'
        }
      ]
    },
    {
      id: 'document-mapping',
      index: 6,
      title: 'Document Mapping',
      chapter: 'Transaction completion',
      caption:
        'Auto-detected fields and role-based assignment close the loop on every transaction.',
      screen: documentMapping,
      duration: 22000,
      annotations: [
        {
          id: 'mapping.detection',
          title: 'Automated field recognition',
          body:
            'Detected signatures and initials remove repetitive setup work on documents agents send daily.',
          anchor: { x: 46, y: 21 },
          card: { x: 1, y: 18 },
          placement: 'right'
        },
        {
          id: 'mapping.roles',
          title: 'Responsibilities by role, not person',
          body:
            'Each field maps to a participant role, so reassignment never breaks the document’s logic.',
          anchor: { x: 88, y: 28 },
          card: { x: 83.5, y: 28 },
          placement: 'left'
        },
        {
          id: 'mapping.vocabulary',
          title: 'Field types built for the transaction',
          body:
            'Vocabulary matches real-estate documents—highlight, crop, clone—not generic PDF tooling.',
          anchor: { x: 90, y: 58 },
          card: { x: 83.5, y: 56 },
          placement: 'left'
        }
      ]
    }
  ]
};

export default timeline;
