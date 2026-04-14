# SXSF agent suite

This document records the reusable agents created for the Science X Sci-Fi workflow.

## User-facing orchestration agent

### `SXSF New Story`
- **Agent ID:** `48332427-d855-43ed-87f3-82ca5f75d373`
- **Purpose:** Runs the end-to-end pipeline and returns a publish-ready TypeScript story file plus an append-ready summary snippet for `prior-story-summaries.md`.
- **Required inputs:**
  - `prior_summaries_file`
  - `story_template_file`
- **Optional inputs:**
  - `story_date`
  - `special_focus`
  - `extra_constraints`

## Specialist subagents

### `SXSF Phase 1 Research Scout`
- **Agent ID:** `73b763fd-2bbe-4444-a834-5aafde52034e`
- **Role:** Finds recent scientific breakthroughs and generates 3–5 novel, grounded story proposals.

### `SXSF Phase 2 Novelty Selector`
- **Agent ID:** `28a8d79b-0209-4b91-8662-6821b818c8ef`
- **Role:** Selects the strongest proposal, removes similarity to prior stories, and develops a refined outline.

### `SXSF Phase 3 Story Drafter`
- **Agent ID:** `93c4a886-a81e-4cf5-930d-156d2cf965aa`
- **Role:** Writes the story into the provided TypeScript template.

### `SXSF Phase 4 Final Reviewer`
- **Agent ID:** `c3d4867a-aebe-490f-b54d-f536c8643cd4`
- **Role:** Final editorial pass for originality, scientific grounding, narrative quality, and valid TypeScript output.

### `SXSF Summary Snippet Writer`
- **Agent ID:** `5eb516bf-d62d-41a4-973a-579ff8408006`
- **Role:** Produces an append-ready Markdown summary snippet matching the house style of `prior-story-summaries.md`.

## Intended pipeline

1. Read the current SXSF prior summaries and story template.
2. Generate several fresh science-grounded proposals.
3. Select and revise the most novel concept.
4. Draft the story into the TypeScript template.
5. Run a final originality and quality pass.
6. Produce a Markdown snippet for the summaries file.

## Recommended maintainer workflow

Launch `SXSF New Story` and provide:
- the latest `prior-story-summaries.md`
- the latest `story-template.ts`
- optional date/focus/constraints

The orchestration agent is designed to create:
- a final `.ts` story artifact
- a `.md` snippet artifact ready to append to `prior-story-summaries.md`

## Notes

- The image generation part is intentionally ignored for now, except that the template field is preserved.
- The system is biased toward novelty, reputable science sources, and avoiding repeated names/settings/twist patterns.
- A dry-run readiness check of the orchestration design was completed successfully after creation.