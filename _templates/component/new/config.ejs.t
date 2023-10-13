---
to: "src/components/<%= locals.type ? locals.type : '02-composants' %>/<%= name %>/<%= name %>.config.json"
---
{
    "label":"<%=h.changeCase.pascal(name)%>",
    "context": {},
    "status": null
}
