<template>
    <div class="main">
        <div class="row" style="border-color: #ffcfa0;">
            <div v-for="piece of game?.killed.white" class="inner">
                <PieceImg :pieceName="piece.pieceName" :side="piece.side" />
            </div>
        </div>

        <div class="row" style="border-color: #d28c45;">
            <div v-for="p2 of game?.killed.black" class="inner">
                <PieceImg :pieceName="p2.pieceName" :side="p2.side" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Game } from '~/chess/game';

defineProps({
    game: {
        type: Game
    },
})

</script>

<style lang="scss">
.main {
    padding-top: 50px;
}

.row {
    margin-bottom: 20px;
    border: 2px solid black;
    min-height: 6vw;
}

.inner {
    width: 5vw;
    height: 5vw;
    display: inline-block;
}
</style>
