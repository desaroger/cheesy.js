<template>
    <div class="piece" :class="[pieceName, side]">

    </div>
</template>

<script setup lang="ts">

defineProps({
    pieceName: {
        type: String
    },
    side: {
        type: String
    }
})

</script>

<style lang="scss">
.piece {
    background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chess_Pieces_Sprite.svg/800px-Chess_Pieces_Sprite.svg.png);
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 600% auto;

    &.King {
        background-position-x: 0px;
    }

    &.Queen {
        background-position-x: 20%;
    }

    &.Bishop {
        background-position-x: 40%;
    }

    &.Knight {
        background-position-x: 60%;
    }

    &.Rook {
        background-position-x: 80%;
    }

    &.Pawn {
        background-position-x: 100%;
    }

    &.white {
        background-position-y: 0px;
    }

    &.black {
        background-position-y: 100%;
    }
}
</style>
