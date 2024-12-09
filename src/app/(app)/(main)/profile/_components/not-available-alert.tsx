const NotAvailableAlert = () => {
  return (
    <div className="size-full mx-auto">
      <div className="flex flex-col border border-yellow-300 bg-yellow-100 rounded-lg w-fit p-8 items-center justify-center space-y-4 text-center">
        <h3 className="text-lg font-bold">
          <span className="text-primary">
            <span className="font-bold">🚧</span> Táto funkcia momentálne nie je dostupná.
          </span>
        </h3>
        {/* <p className="text-muted-foreground">Ak máte nám o ňu čo napísať, prosím skontaktujte nás.</p> */}
      </div>
    </div>
  )
}

export default NotAvailableAlert
