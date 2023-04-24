const translations = {
  "shelf.editingTitle": "Warestream",
  "shelf.saveShelfEditing": "Save",
  "shelf.cancelEditing": "Cancel",
  "shelf.3dview": "Enable 3D",
  "shelf.editAction.split-horizontal-2": "Split Horizontally",
  "shelf.editAction.split-vertical-2": "Split Vertically",
  "shelf.editAction.split-4": "Split into 4 cells",
  "shelf.editAction.split-16": "Split into 16 cells",
  "shelf.editAction.scale-cell-up": "Scale Up",
  "shelf.editAction.scale-cell-down": "Scale Down",
  "shelf.editAction.add-sibling": "Add Neighboring Cell",
  "shelf.editAction.delete": "Delete Shelf",
  "shelf.undo": "Undo",
  "shelf.undoAll": "Reset Changes",
};

export const useTranslate = () => {
  const translate = (key: keyof typeof translations) => {
    return translations[key] || key;
  };

  return { translate };
};
