import { Board, ChessProfession, Entity, get_initial_state, main, ResolvedGameState } from "shogoss-core";
import { parse } from "shogoss-parser";

window.addEventListener("load", () => {
    render(get_initial_state("黒").board);
    document.getElementById("load_history")!.addEventListener("click", load_history);
});
function load_history() {
    const text = (document.getElementById("history")! as HTMLTextAreaElement).value;
    const moves = parse(text);
    try {
        const state = main(moves);
        if (state.phase === "game_end") {
            alert(`勝者: ${state.victor}、理由: ${state.reason}`);
            render(state.final_situation.board);
        } else {
            render(state.board);
        }
    } catch (e) {
        alert(e);
    }
}

function getContentHTMLFromEntity(entity: Entity): string {
    if (entity.type === "碁") return "";
    if (entity.type === "ス" && entity.prof !== "と" && entity.prof !== "ポ") { 
        return `<span style="font-size: 200%">${
            { キ: "♔", ク: "♕", ル: "♖", ビ: "♗", ナ: "♘" }[entity.prof]
        }</span>`; 
    }
    return entity.prof
}

function render(board: Board) {
    let ans = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const entity = board[i][j];
            if (entity === null) {
                continue;
            }
            const str = getContentHTMLFromEntity(entity);
            ans += `<div class="${entity.side === "白" ? "white" : "black"}" style="top:${50 + i * 50}px; left:${100 + j * 50}px;">${str}</div>`
        }
    }
    document.getElementById("board")!.innerHTML = ans;
}
