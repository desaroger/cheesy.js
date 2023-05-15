<template>
    <div style="position: relative;">
        <div class="menu" v-if="props.game?.status === 'finished'">
            <div class="inner">
                <h2>Game over</h2>
                <h4>Winner: {{ props.game?.winner }}</h4>
                <button @click="restart()">restart</button>
            </div>
        </div>

        <table class="center" :class="[`${props.game?.board.starts}-starts`]">
            <tbody>
                <tr v-for="rows in props.game?.board.matrix">
                    <td v-for="cell in rows" @click="click(cell.position)"
                        :style="{ height: `${100 / rows.length}%`, width: `${100 / rows.length}%` }"
                        :class="{ possibleMovement: isAPossibleMovement(cell.position) }">
                        <PieceImg v-if="cell.is(Piece)" :type="(cell as Piece).getPieceName()"
                            :side="(cell as Piece).side" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { Game } from '~/chess/game';
import { Piece } from '~/chess/pieces/piece';
import type { Position } from '~/chess/types';
import { includes } from '~/chess/utils';

const props = defineProps({
    game: {
        type: Game
    }
});

const data = reactive({
    selected: null as Position | null,
})

const possibleMovements = computed(() => {
    if (!data.selected) {
        return [];
    }

    const piece = props.game?.board.get(data.selected);
    if (!(piece instanceof Piece)) {
        return [];
    }

    return piece.getPossibleMovements();
})

function click(position: Position) {
    if (data.selected && isAPossibleMovement(position)) {
        props.game!.move(data.selected, position);
        return;
    }

    const piece = props.game?.board.get(position);
    if (!(piece instanceof Piece)) {
        return;
    }

    if (piece.side !== props.game?.turn) {
        return;
    }

    data.selected = position;
}

function isAPossibleMovement(position: Position) {
    return includes(possibleMovements.value, position);
}

function restart() {
    data.selected = null;
    props.game?.restart()
}

</script>

<style lang="scss">
table {
    width: 50vw;
    height: 50vw;
    border-collapse: collapse;
}

table td {
    vertical-align: middle;
    text-align: center !important;
}

table.center {
    margin: auto;
}

td.possibleMovement {
    background-color: #82b2ff !important;
}

table.black-starts {

    tr:nth-of-type(even) td:nth-of-type(odd),
    tr:nth-of-type(odd) td:nth-of-type(even) {
        background-color: #ffcfa0;
    }

    tr:nth-of-type(even) td:nth-of-type(even),
    tr:nth-of-type(odd) td:nth-of-type(odd) {
        background-color: #d28c45;
    }
}

table.white-starts {

    tr:nth-of-type(even) td:nth-of-type(odd),
    tr:nth-of-type(odd) td:nth-of-type(even) {

        background-color: #d28c45;
    }

    tr:nth-of-type(even) td:nth-of-type(even),
    tr:nth-of-type(odd) td:nth-of-type(odd) {
        background-color: #ffcfa0;
    }
}

.menu {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.515);
    text-align: center;

    .inner {
        width: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
    }
}
</style>
