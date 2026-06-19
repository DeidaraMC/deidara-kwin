registerShortcut("Switch to Screen to the Left and Move Mouse", "Switch screen left + move mouse", "", function () {
  switchScreenAndMoveMouse("Left");
})

registerShortcut("Switch to Screen to the Right and Move Mouse", "Switch screen right + move mouse", "", function () {
  switchScreenAndMoveMouse("Right");
})

function switchScreenAndMoveMouse(direction) {
  // Order screens by physical location
  const orderedScreens = workspace.screens.slice().sort((a, b) => a.geometry.x - b.geometry.x);
  const currentIndex = orderedScreens.indexOf(workspace.activeScreen);
  const step = direction === "Right" ? 1 : -1;
  //
  const nextIndex = Math.max(0, Math.min(orderedScreens.length - 1, currentIndex + step));
  if (nextIndex === currentIndex) {
    // Prevent screen wrapping behaviour
    // but move cursor for visual feedback
    invokeShortcut("MoveMouseToFocus");
    return;
  }

  invokeShortcut("Switch to Screen to the " + direction, () => invokeShortcut("MoveMouseToFocus"));
}

function invokeShortcut(name, callback = () => {}) {
  callDBus("org.kde.kglobalaccel", "/component/kwin", "org.kde.kglobalaccel.Component", "invokeShortcut", name, callback);
}
