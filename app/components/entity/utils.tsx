import { Node_, NodeType } from "@/app/types/graph";
import { cleanMarkdownLinks, extractPlainText, shuffleArray, trimText } from "../utils";
import { Key, FileText, FolderOpen, ListChecks, Bike, Blocks, FileQuestion, TextSelect, Sparkles, Network } from "lucide-react";

export interface BasicInfo {
  label: string | null;
  title: string | null;
  description: string | null;
  content: string | null;
  entityType: NodeType;
  typeName: string;
  typeIcon: React.ComponentType;
}


async function extractAnswerInfo(node: Node_): Promise<BasicInfo> {
  if (node.answer === undefined) {
    throw new Error("Answer node must have an answer field");
  }

  const content = cleanMarkdownLinks(node.answer.text);

  const desc = trimText(await extractPlainText(node.answer.text), 500);
  return {
    label: node.answer.text,
    title: null,
    description: desc,
    content: content,
    entityType: NodeType.Answer,
    typeName: "Answer",
    typeIcon: () => <Sparkles strokeWidth={1.5} />,
  };
}

function extractQAInfo(node: Node_): BasicInfo {
  if (node.qa === undefined) {
    throw new Error("QA node must have a qa field");
  }
  return {
    label: node.qa.question,
    title: node.qa.question,
    description: node.qa.answer,
    content: null,
    entityType: NodeType.QA,
    typeName: "Q&A",
    typeIcon: () => <FileQuestion strokeWidth={1.5} />,
  };
}


async function extractBlockInfo(node: Node_): Promise<BasicInfo> {
  if (node.block === undefined) {
    throw new Error("Block node must have a block field");
  }

  const iconCpn = (
    node.block.title !== null ? () => <Network strokeWidth={1.5} /> : () => <TextSelect strokeWidth={1.5} />
  )

  const textPlain = await extractPlainText(node.block.text);
  const label = node.block.title !== null ? node.block.title : trimText(textPlain, 50);
  return {
    label: label,
    title: node.block.title,
    description: node.block.short_summary !== null ? node.block.short_summary : trimText(node.block.text, 600),
    content: node.block.long_summary !== null ? node.block.long_summary : node.block.text,
    entityType: NodeType.Block,
    typeName: node.block.short_summary !== null ? "Section" : "Text Chunk",
    typeIcon: iconCpn,
  };
}


function extractConceptInfo(node: Node_): BasicInfo {
  if (node.concept === undefined) {
    throw new Error("Concept node must have a concept field");
  }
  const description = trimText(node.concept.definition, 240);
  return {
    label: node.concept.label,
    title: node.concept.label,
    description: description,
    content: null,
    entityType: NodeType.Concept,
    typeName: "Concept",
    typeIcon: () => <Key strokeWidth={1.5} />,
  };
}


function extractDocumentInfo(node: Node_): BasicInfo {
  if (node.doc === undefined) {
    throw new Error("Doc node must have a doc field");
  }
  return {
    label: node.doc.title,
    title: node.doc.title,
    description: node.doc.short_summary,
    content: node.doc.synthesis_,
    entityType: NodeType.Document,
    typeName: "Document",
    typeIcon: () => <FileText strokeWidth={1.5} />,
  };
}


function extractCorpusInfo(node: Node_): BasicInfo {
  if (node.corpus === undefined) {
    throw new Error("Corpus node must have a corpus field");
  }
  return {
    label: node.corpus.title,
    title: node.corpus.title,
    description: node.corpus.short_summary,
    content: node.corpus.synthesis,
    entityType: NodeType.Corpus,
    typeName: "Corpus",
    typeIcon: () => <FolderOpen strokeWidth={1.5} />,
  };
}


function extractExerciseInfo(node: Node_): BasicInfo {
  if (node.exercise === undefined) {
    throw new Error("Exercise node must have an exercise field");
  }

  const lines: string[] = []
  node.exercise.distractors.forEach((distractor) => {
    lines.push(`- [ ] ${distractor}`);
  })
  node.exercise.answers.forEach((answer) => {
    lines.push(`- [x] ${answer}`);
  })
  const shuffled = shuffleArray(lines);
  const content = shuffled.join("\n");

  return {
    label: node.exercise.question,
    title: node.exercise.question,
    description: content,
    content: content,
    entityType: NodeType.Exercise,
    typeName: "Exercise",
    typeIcon: () => <ListChecks strokeWidth={1.5} />,
  };
}


function extractRomeCompetencyInfo(node: Node_): BasicInfo {
  if (node.rome_competency === undefined) {
    throw new Error("RomeCompetency node must have a rome_competency field");
  }
  return {
    label: `ROME - ${node.rome_competency.micro_competency}`,
    title: node.rome_competency.macro_competency,
    description: node.rome_competency.micro_competency,
    content: null,
    entityType: NodeType.ROMECompetency,
    typeName: "ROME Competency",
    typeIcon: () => <Blocks strokeWidth={1.5} />,
  };
}


function extractRncpCompetencyInfo(node: Node_): BasicInfo {
  if (node.rncp_competency === undefined) {
    throw new Error("RncpCompetency node must have a rncp_competency field");
  }
  return {
    label: `RNCP - ${node.rncp_competency.competency}`,
    title: node.rncp_competency.competency,
    description: null,
    content: null,
    entityType: NodeType.RNCPCompetency,
    typeName: "RNCP Competency",
    typeIcon: () => <Bike strokeWidth={1.5} />,
  };
}


export async function extractBasicInfo(node: Node_): Promise<BasicInfo> {
  switch (node.type) {
    case NodeType.Answer:
      return await extractAnswerInfo(node);
    case NodeType.QA:
      return extractQAInfo(node);
    case NodeType.Block:
      return await extractBlockInfo(node);
    case NodeType.Concept:
      return extractConceptInfo(node);
    case NodeType.Document:
      return extractDocumentInfo(node);
    case NodeType.Corpus:
      return extractCorpusInfo(node);
    case NodeType.Exercise:
      return extractExerciseInfo(node);
    case NodeType.ROMECompetency:
      return extractRomeCompetencyInfo(node);
    case NodeType.RNCPCompetency:
      return extractRncpCompetencyInfo(node);
    default:
      return {
        label: "untitled",
        title: "untitled",
        description: null,
        content: null,
        entityType: node.type,
        typeName: "Unknown",
        typeIcon: () => <span>?</span>,
      }
  }
}