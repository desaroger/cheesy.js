<template>
    <div class="piece" :class="[type, side]">

    </div>
</template>

<script setup lang="ts">

defineProps({
    type: {
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

    &.king {
        background-position-x: 0px;
    }

    &.queen {
        background-position-x: 20%;
    }

    &.bishop {
        background-position-x: 40%;
    }

    &.knight {
        background-position-x: 60%;
    }

    &.rook {
        background-position-x: 80%;
    }

    &.pawn {
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
