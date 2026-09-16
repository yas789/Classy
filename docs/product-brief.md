# Classy Product Brief

## Summary

Classy is an AI-assisted exam marking platform for teachers. It helps teachers process handwritten student papers by splitting the workflow into reviewable stages: segmentation, interpretation, and marking.

The MVP should prove that the teacher review experience is useful before investing in real AI integrations.

## Target User

The initial target user is a teacher who marks handwritten exam papers and wants to reduce repetitive marking effort without giving up control over final marks.

## Problem

Handwritten exam marking is slow, repetitive, and mentally draining. Teachers often need to apply the same mark scheme across many similar answers while maintaining consistency. Existing generic AI tools may produce answers, but they often lack a structured workflow for verifying handwriting interpretation, checking evidence, and confirming final marks.

## Proposed Solution

Classy provides a structured assessment workspace where teachers upload papers and mark schemes, review AI-generated segmentation and interpretation, then confirm or override proposed marks.

The product should make the AI's reasoning inspectable. A teacher should be able to see which parts of a student's answer support each awarded mark.

## Core Flow

```text
Create class
  -> create assessment
  -> upload question paper and mark scheme
  -> upload or scan student papers
  -> AI segmentation
  -> teacher confirms segmentation
  -> AI interpretation
  -> teacher confirms interpretation
  -> AI marking
  -> teacher confirms or overrides mark
  -> results/export
```

## Review Modes

### By Question

Teachers review the same question across all students. This mode supports consistency because the teacher stays focused on one mark scheme item at a time.

Example path:

```text
Assessment -> Question 1 -> Student A -> Student B -> Student C
```

### By Student

Teachers review one student's full paper. This mode supports final checks, holistic review, and cases where a teacher wants to inspect an individual student's work.

Example path:

```text
Assessment -> Student A -> Question 1 -> Question 2 -> Question 3
```

## Marking Workflow

### 1. Segmentation

The system identifies relevant answer regions from a handwritten paper.

Teacher needs:

- See the detected region.
- See confidence.
- Confirm the region or flag it for correction.

### 2. Interpretation

The system converts the handwritten answer into structured text and assigns numbered references to important parts of the response.

Teacher needs:

- Compare interpreted text against the scanned answer.
- See numbered references such as `[1]`, `[2]`, `[3]`.
- Confirm or override the interpretation before marking is available.

### 3. Marking

The system proposes marks using the mark scheme and interpretation references.

Teacher needs:

- See proposed marks.
- See a reasoned explanation linked to numbered references.
- Confirm or override the mark.
- Move efficiently to the next student or next question.

## MVP Chemistry Example

The first mock workflow should use a chemistry question because it naturally supports partial marks and evidence-based marking.

Example question:

```text
Explain why increasing the temperature increases the rate of reaction.
```

Example mark scheme:

```text
1 mark: particles have more kinetic energy.
1 mark: particles collide more frequently.
1 mark: a greater proportion of collisions have energy greater than or equal to activation energy.
```

Example interpreted student answer:

```text
[1] When the temperature is higher the particles move faster.
[2] This means they hit each other more often.
[3] More of the particles have enough energy to react when they collide.
```

Example proposed marking:

```text
Award 3/3.

Reference [1] matches the kinetic energy point.
Reference [2] matches the collision frequency point.
Reference [3] matches the activation energy point.
```

## MVP Success Criteria

- A teacher can navigate through the core review loop without dead ends.
- Marking is locked until interpretation is confirmed.
- The teacher can switch between `By Question` and `By Student` review modes.
- Proposed marks are tied to numbered interpretation references.
- Teacher confirmation and override states are represented in the UI.
- Backend endpoints respond locally with mock data.

## Non-Goals For Initial MVP

- Real AI model integration.
- Production authentication.
- Full Supabase schema.
- Complex role management.
- Payment flows.
- School administration dashboards.
- Mobile scanning app.
- Microservices or distributed infrastructure.

## Open Product Questions

- Should teachers confirm segmentation for every answer, or only low-confidence cases?
- Should interpretation overrides be stored as plain text edits, structured edits, or both?
- Should exported results include AI confidence and teacher override history?
- What is the minimum review friction needed for teacher trust?
