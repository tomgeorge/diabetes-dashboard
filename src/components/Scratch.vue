<template>
  <div id="scratch">
    <div class="container mx-auto">
      <div class="box-border h-48 w-32 p-4 border-4">
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
          </div>
          <div>
            <div class="text-xl font-medium text-black">ChitChat</div>
            <p class="text-gray-500">You have a new message!</p>
          </div>
        </div>
      </div>
      <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0" src="/img/erin-lindford.jpg" alt="Woman's Face">
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">
            Erin Lindford
            </p>
            <p class="text-gray-500 font-medium">
            Product Engineer
            </p>
          </div>
          <button class="px-4 py-1 text-sm bg-purple-600 text-white font-semibold rounded-full border hover:backgroundOpacity=.5 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
        </div>
      </div>
    </div>
  </div>
</template>
