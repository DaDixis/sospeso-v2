import Accordion from "./Accordion.astro";
import AccordionContent from "./AccordionContent.astro";
import AccordionItem from "./AccordionItem.astro";
import AccordionTrigger from "./AccordionTrigger.astro";

const AccordionVariants = {};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionVariants };

export default {
  Root: Accordion,
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
};
